// taze: youtube from //third_party/javascript/typings/youtube
import {Component} from '../base/index';
import {Attribute, Role} from '../constants/attribute';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';
import {isElementFocusable} from '../focus';
import {CssClasses as ModalCssClasses, Strings as ModalStrings,} from '../modal/constants';
import {Modal} from '../modal/index';

import {CssClasses, DataAttrs, ErrorMessages} from './constants';
import {YoutubeVideoManager as VideoManager} from './videomanager';

/**
 * Creates a YouTube Video component with access to the controls API.
 */
class YoutubeVideo extends Component {
  constructor(root, options) {
    var _a, _b;
    super(root);
    // Unique element id for the player.
    this.id = '';
    /**
     * Hides image overlay and plays video.
     */
    this.hidePosterAndPlay = (e) => {
      var _a, _b;
      if (this.videoElement.contains(e.target)) return;
      // Return if it is a keyboard event, but not Enter key or Space key.
      if (e instanceof KeyboardEvent && e.key !== Key.ENTER &&
          e.key !== Key.SPACE) {
        return;
      }
      if (this.modal) {
        this.modal.open();
      } else {
        (_a = this.previewElement) === null || _a === void 0 ?
            void 0 :
            _a.classList.add(CssClasses.HIDE_ELEMENT);
        this.videoElement.classList.remove(CssClasses.HIDE_ELEMENT);
        this.root.blur();  // Allows iframe to be clicked
      }
      (_b = this.getPlayer()) === null || _b === void 0 ? void 0 :
                                                          _b.playVideo();
    };
    this.previewElement =
        this.root.querySelector(`.${CssClasses.PREVIEW_CONTAINER}`);
    this.root.addEventListener(EventType.CLICK, this.hidePosterAndPlay);
    this.root.addEventListener(EventType.KEYDOWN, this.hidePosterAndPlay);
    if (!isElementFocusable(root)) {
      this.root.tabIndex = 0;
    }
    if (this.root.tagName !== 'A') {
      this.root.setAttribute(Attribute.ROLE, Role.BUTTON);
    }
    const video =
        (options === null || options === void 0 ? void 0 :
                                                  options.modalElement) ?
        options === null || options === void 0 ?
        void 0 :
        options.modalElement.querySelector(`.${CssClasses.VIDEO_CONTAINER}`) :
        this.root.querySelector(`.${CssClasses.VIDEO_CONTAINER}`);
    if (!video) {
      throw new Error(ErrorMessages.MISSING_VIDEO);
    }
    this.videoElement = video;
    if ((_a = this.previewElement) === null || _a === void 0 ?
            void 0 :
            _a.classList.contains(CssClasses.INLINE_VIDEO)) {
      this.videoElement.classList.add(CssClasses.HIDE_ELEMENT);
    }
    // Create a modal component if there is modal markup.
    this.modalCloseHandler = () => {
      var _a;
      return (_a = this.getPlayer()) === null || _a === void 0 ?
          void 0 :
          _a.pauseVideo();
    };
    this.options = this.setPlayerOptions(options);
    this.modalElement =
        (options === null || options === void 0 ? void 0 :
                                                  options.modalElement) ?
        options === null || options === void 0 ? void 0 : options.modalElement :
        this.root.querySelector(`.${ModalCssClasses.ROOT}`);
    if (this.modalElement) {
      this.modal = new Modal(this.modalElement, this.root);
      // Needs to listen for the modal closing so the video can be paused.
      this.modalElement.addEventListener(
          ModalStrings.CLOSED_EVENT, this.modalCloseHandler);
    }
    // The manager of YT API and videos.
    this.manager = VideoManager.getManager();
    YT.ready(() => {
      this.initializeVideo();
    });
    this.posterImageElement =
        this.root.querySelector(`.${CssClasses.IMAGE_CONTAINER}`);
    const posterSrc = (_b = this.posterImageElement) === null || _b === void 0 ?
        void 0 :
        _b.getAttribute('src');
    if (this.posterImageElement &&
        (posterSrc === null || posterSrc === void 0 ? void 0 :
                                                      posterSrc.length) === 0) {
      this.posterImageElement.src = `https://i.ytimg.com/vi_webp/${
          this.options.videoId}/maxresdefault.webp`;
    }
  }
  destroy() {
    var _a, _b, _c, _d, _e;
    super.destroy();
    (_a = this.modal) === null || _a === void 0 ? void 0 : _a.close();
    (_b = this.modal) === null || _b === void 0 ? void 0 : _b.destroy();
    (_c = this.modalElement) === null || _c === void 0 ?
        void 0 :
        _c.removeEventListener(
            ModalStrings.CLOSED_EVENT, this.modalCloseHandler);
    (_d = this.root) === null || _d === void 0 ?
        void 0 :
        _d.removeEventListener(EventType.CLICK, this.hidePosterAndPlay);
    (_e = this.root) === null || _e === void 0 ?
        void 0 :
        _e.removeEventListener(EventType.KEYDOWN, this.hidePosterAndPlay);
    this.destroyPlayer();
  }
  /**
   * Default YtVideo options
   */
  static get defaultOptions() {
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
  initId() {
    var _a;
    // Get IDs in order of precedence.
    //   1. element id attribute
    //   2. playerId from options passed-in
    //   3. a random unique id
    let id = (_a = this.videoElement.id) !== null && _a !== void 0 ? _a : '';
    // Make ID unique and random if unprovided.
    if (this.isValidPlayerId(id)) {
      id = this.options.playerId ||
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
  refreshPlayerOptions(passedOptions) {
    this.destroyPlayer();
    this.options =
        Object.assign({}, YoutubeVideo.defaultOptions, passedOptions);
    if (this.options.playerId) this.id = this.options.playerId;
    this.initializeVideo();
  }
  /**
   * Sets the options and id of the video.
   * Uses data-attributes, if present, otherwise use passed-in option
   * If neither exist, use the default
   * @param passedOptions Options passed in by the user.
   */
  setPlayerOptions(passedOptions) {
    const attrOptions = {};
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
      attrOptions.playerVars = attrData[DataAttrs.PLAYER_VARS];
    }
    const fullOptions = Object.assign(
        {}, YoutubeVideo.defaultOptions, passedOptions, attrOptions);
    if (fullOptions.playerId) {
      this.id = fullOptions.playerId;
    }
    return fullOptions;
  }
  /**
   * Initialize the video player.
   */
  initializeVideo() {
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
  setVideoTimestamp() {
    var _a, _b, _c, _d;
    const timestamp = this.root.querySelector(`.${CssClasses.DURATION}`);
    if (timestamp) {
      const duration = (_b = (_a = this.getPlayer()) === null || _a === void 0 ?
                            void 0 :
                            _a.getDuration()) !== null &&
              _b !== void 0 ?
          _b :
          0;
      const mills = new Date(duration * 1000).toISOString();
      const time = mills.substring(11, 13) === '00' ? mills.substring(14, 19) :
                                                      mills.substring(11, 19);
      timestamp.textContent = time;
      (_d = (_c = this.root) === null || _c === void 0 ?
           void 0 :
           _c.querySelector(`.${CssClasses.TIMESTAMP}`)) === null ||
              _d === void 0 ?
          void 0 :
          _d.classList.add(`${CssClasses.TIMESTAMP_SHOW}`);
    }
  }
  /**
   * Gets video player object.
   */
  getPlayer() {
    return this.manager.getYtPlayer(this.id);
  }
  /**
   * Destroys the video player and iframe.
   */
  destroyPlayer() {
    this.manager.unregisterYtPlayer(this.id);
  }
  /**
   * Gets video player ID.
   */
  getPlayerId() {
    if (this.isValidPlayerId(this.id)) {
      this.initId();
    }
    return this.id;
  }
  /**
   * If the player ID is a valid one.
   * This is lifted from closure goog.string.isEmptyOrWhitespace function.
   */
  isValidPlayerId(id) {
    return /^[\s\xa0]*$/.test(id);
  }
}
export {YoutubeVideo};
