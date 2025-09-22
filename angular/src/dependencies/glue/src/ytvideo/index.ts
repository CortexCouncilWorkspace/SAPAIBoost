// taze: youtube from //third_party/javascript/typings/youtube

import {Component} from '../base/index';
import {Attribute, Role} from '../constants/attribute';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import {isElementFocusable} from '../focus';
import {
  CssClasses as ModalCssClasses,
  Strings as ModalStrings,
} from '../modal/constants';
import {Modal} from '../modal/index';

import {CssClasses, DataAttrs, ErrorMessages} from './constants';
import {YoutubeVideoManager as VideoManager} from './videomanager';

declare interface YtVideoOptions extends YT.PlayerOptions {
  playerId?: string;
  modalElement?: HTMLElement; // Pass a custom modal element to be initialized
}

// Add class methods here to prevent deletion in the CDN.
declare interface YoutubeVideoDef {
  refreshPlayerOptions: (options: YtVideoOptions) => void;
  getPlayer: () => YT.Player | undefined;
  getPlayerId: () => string;
  options: YtVideoOptions;
}

/**
 * Creates a YouTube Video component with access to the controls API.
 */
class YoutubeVideo extends Component implements YoutubeVideoDef {
  options: YtVideoOptions;
  private readonly manager: VideoManager;
  private readonly previewElement: HTMLElement | null;
  private readonly videoElement: HTMLElement;
  private readonly posterImageElement: HTMLImageElement | null;
  private readonly modalElement: HTMLElement | null;
  private readonly modal: Modal | undefined;
  private readonly modalCloseHandler: () => void;

  // Unique element id for the player.
  private id = '';

  constructor(root: HTMLElement, options?: YtVideoOptions) {
    super(root);

    this.previewElement = this.root.querySelector<HTMLElement>(
      `.${CssClasses.PREVIEW_CONTAINER}`,
    );
    this.root.addEventListener(EventType.CLICK, this.hidePosterAndPlay);
    this.root.addEventListener(EventType.KEYDOWN, this.hidePosterAndPlay);

    if (!isElementFocusable(root)) {
      this.root.tabIndex = 0;
    }

    if (this.root.tagName !== 'A') {
      this.root.setAttribute(Attribute.ROLE, Role.BUTTON);
    }

    const video = options?.modalElement
      ? options?.modalElement.querySelector<HTMLElement>(
          `.${CssClasses.VIDEO_CONTAINER}`,
        )
      : this.root.querySelector<HTMLElement>(`.${CssClasses.VIDEO_CONTAINER}`);

    if (!video) {
      throw new Error(ErrorMessages.MISSING_VIDEO);
    }

    this.videoElement = video;

    if (this.previewElement?.classList.contains(CssClasses.INLINE_VIDEO)) {
      this.videoElement.classList.add(CssClasses.HIDE_ELEMENT);
    }

    // Create a modal component if there is modal markup.
    this.modalCloseHandler = () => this.getPlayer()?.pauseVideo();
    this.options = this.setPlayerOptions(options);

    this.modalElement = options?.modalElement
      ? options?.modalElement
      : this.root.querySelector<HTMLElement>(`.${ModalCssClasses.ROOT}`);

    if (this.modalElement) {
      this.modal = new Modal(this.modalElement, this.root);

      // Needs to listen for the modal closing so the video can be paused.
      this.modalElement.addEventListener(
        ModalStrings.CLOSED_EVENT,
        this.modalCloseHandler,
      );
    }

    // The manager of YT API and videos.
    this.manager = VideoManager.getManager();

    YT.ready(() => {
      this.initializeVideo();
    });

    this.posterImageElement = this.root.querySelector<HTMLImageElement>(
      `.${CssClasses.IMAGE_CONTAINER}`,
    );
    const posterSrc = this.posterImageElement?.getAttribute('src');
    if (this.posterImageElement && posterSrc?.length === 0) {
      this.posterImageElement.src = `https://i.ytimg.com/vi_webp/${this.options.videoId}/maxresdefault.webp`;
    }
  }

  override destroy() {
    super.destroy();

    this.modal?.close();
    this.modal?.destroy();
    this.modalElement?.removeEventListener(
      ModalStrings.CLOSED_EVENT,
      this.modalCloseHandler,
    );

    this.root?.removeEventListener(EventType.CLICK, this.hidePosterAndPlay);
    this.root?.removeEventListener(EventType.KEYDOWN, this.hidePosterAndPlay);

    this.destroyPlayer();
  }

  /**
   * Default YtVideo options
   */
  static get defaultOptions(): YtVideoOptions {
    return {
      playerId: '',
      width: '',
      height: '',
      videoId: '',
      playerVars: {},
      events: {},
    };
  }

  /**
   * Sets or creates the unique identifier for the player element to be
   * used as the unique key.
   */
  private initId() {
    // Get IDs in order of precedence.
    //   1. element id attribute
    //   2. playerId from options passed-in
    //   3. a random unique id
    let id = this.videoElement.id ?? '';

    // Make ID unique and random if unprovided.
    if (this.isValidPlayerId(id)) {
      id =
        this.options.playerId ||
        `youtube-player-${Math.round(Math.random() * Math.pow(10, 6))}`;

      // There must be an element id.
      this.videoElement.id = id;
    }

    this.id = id;
  }

  /**
   * Re-initialize the video player with new options.
   * @param passedOptions The new options package.
   */
  refreshPlayerOptions(passedOptions: YtVideoOptions) {
    this.destroyPlayer();

    this.options = Object.assign(
      {},
      YoutubeVideo.defaultOptions,
      passedOptions,
    );

    if (this.options.playerId) this.id = this.options.playerId;

    this.initializeVideo();
  }

  /**
   * Sets the options and id of the video.
   * Uses data-attributes, if present, otherwise use passed-in option
   * If neither exist, use the default
   * @param passedOptions Options passed in by the user.
   */
  private setPlayerOptions(passedOptions?: YtVideoOptions): YtVideoOptions {
    const attrOptions: YtVideoOptions = {};
    const attrData = this.videoElement.dataset;

    if (DataAttrs.VIDEO_ID in attrData) {
      attrOptions.videoId = attrData[DataAttrs.VIDEO_ID];
    }
    if (DataAttrs.PLAYER_ID in attrData) {
      attrOptions.playerId = attrData[DataAttrs.PLAYER_ID];
    }
    if (DataAttrs.HEIGHT in attrData) {
      attrOptions.height = attrData[DataAttrs.HEIGHT];
    }
    if (DataAttrs.WIDTH in attrData) {
      attrOptions.width = attrData[DataAttrs.WIDTH];
    }
    if (DataAttrs.PLAYER_VARS in attrData) {
      attrOptions.playerVars = attrData[DataAttrs.PLAYER_VARS] as YT.PlayerVars;
    }

    const fullOptions = Object.assign(
      {},
      YoutubeVideo.defaultOptions,
      passedOptions,
      attrOptions,
    );

    if (fullOptions.playerId) {
      this.id = fullOptions.playerId;
    }

    return fullOptions;
  }

  /**
   * Initialize the video player.
   */
  private initializeVideo() {
    // The video can't be stored without an ID.
    if (this.isValidPlayerId(this.id)) {
      this.initId();
    }

    // Make sure the playerId is set.
    this.options.playerId = this.id;

    // makeVideoContainerElem will make a new sub-element that the
    // YT Player will replace with an iframe. This step prevents
    // replacing the root element with the iframe.
    const el = this.videoElement.appendChild(document.createElement('div'));

    if (this.options.events) {
      if (this.options.events.onReady === undefined) {
        this.options.events.onReady = () => {
          this.setVideoTimestamp();
        };
      } else {
        const userFunction = this.options.events.onReady;
        this.options.events.onReady = (event) => {
          this.setVideoTimestamp();
          userFunction(event);
        };
      }
    }

    const player = new window.YT.Player(el, this.options);
    this.manager.registerYtPlayer(this.id, player);
  }

  /**
   * Gets the video duration and sets timestamp.
   */
  private setVideoTimestamp() {
    const timestamp = this.root.querySelector<HTMLElement>(
      `.${CssClasses.DURATION}`,
    );
    if (timestamp) {
      const duration = this.getPlayer()?.getDuration() ?? 0;
      const mills = new Date(duration * 1000).toISOString();
      const time =
        mills.substring(11, 13) === '00'
          ? mills.substring(14, 19)
          : mills.substring(11, 19);
      timestamp.textContent = time;
      this.root
        ?.querySelector(`.${CssClasses.TIMESTAMP}`)
        ?.classList.add(`${CssClasses.TIMESTAMP_SHOW}`);
    }
  }

  /**
   * Gets video player object.
   */
  getPlayer(): YT.Player | undefined {
    return this.manager.getYtPlayer(this.id);
  }

  /**
   * Destroys the video player and iframe.
   */
  private destroyPlayer() {
    this.manager.unregisterYtPlayer(this.id);
  }

  /**
   * Gets video player ID.
   */
  getPlayerId(): string {
    if (this.isValidPlayerId(this.id)) {
      this.initId();
    }
    return this.id;
  }

  /**
   * If the player ID is a valid one.
   * This is lifted from closure goog.string.isEmptyOrWhitespace function.
   */
  private isValidPlayerId(id: string): boolean {
    return /^[\s\xa0]*$/.test(id);
  }

  /**
   * Hides image overlay and plays video.
   */
  private readonly hidePosterAndPlay = (e: Event) => {
    if (this.videoElement.contains(e.target as HTMLElement)) return;

    // Return if it is a keyboard event, but not Enter key or Space key.
    if (
      e instanceof KeyboardEvent &&
      e.key !== Key.ENTER &&
      e.key !== Key.SPACE
    ) {
      return;
    }

    if (this.modal) {
      this.modal.open();
    } else {
      this.previewElement?.classList.add(CssClasses.HIDE_ELEMENT);
      this.videoElement.classList.remove(CssClasses.HIDE_ELEMENT);
      this.root.blur(); // Allows iframe to be clicked
    }
    this.getPlayer()?.playVideo();
  };
}

export {YoutubeVideo, type YtVideoOptions};
