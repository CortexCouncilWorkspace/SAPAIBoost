import {Component} from '../base';
import {Attribute, Role, TabIndex} from '../constants/attribute';
import {EventType} from '../events/eventtype';
import {Key} from '../events/key';

import {CssClasses, ErrorMessage} from './constants';

// Add class methods here to prevent deletion in the CDN.
declare interface AmbientVideoDef {
  playVideo: () => void;
  pauseVideo: () => void;
}

/**
 * Glue Ambient Video component
 */
class AmbientVideo extends Component implements AmbientVideoDef {
  /** A Button that when clicked play/pause the video. */
  private readonly button: HTMLElement;
  /** A Button Icon */
  private readonly icon: HTMLElement;
  /** A Video Element of Ambient Player component. */
  private readonly videoContainer: HTMLMediaElement;
  /** A Button tooltip with play label */
  private readonly tooltipPlay: HTMLElement;
  /** A Button tooltip with pause label */
  private readonly tooltipPause: HTMLElement;

  constructor(root: HTMLElement) {
    super(root);

    const mediaElement = this.root.querySelector<HTMLMediaElement>(
      `.${CssClasses.VIDEO_CONTAINER}`,
    );

    if (!mediaElement) {
      throw new Error(ErrorMessage.MEDIA_ELEMENT_MISSING);
    } else {
      this.videoContainer = mediaElement;
    }

    let element = this.root.querySelector<HTMLElement>(`.${CssClasses.BUTTON}`);

    if (!element) {
      throw new Error(ErrorMessage.BUTTON_ELEMENT_MISSING);
    } else {
      this.button = element;
    }

    element = this.button.querySelector<HTMLElement>(
      `.${CssClasses.BUTTON_ICON}`,
    );

    if (!element) {
      throw new Error(ErrorMessage.BUTTON_ICON_ELEMENT_MISSING);
    } else {
      this.icon = element;
    }

    element = this.button.querySelector(`.${CssClasses.TOOLTIP_PLAY}`);
    if (!element) {
      throw new Error(ErrorMessage.TOOLTIP_PLAY_MISSING);
    } else {
      this.tooltipPlay = element;
    }

    element = this.button.querySelector(`.${CssClasses.TOOLTIP_PAUSE}`);
    if (!element) {
      throw new Error(ErrorMessage.TOOLTIP_PAUSE_MISSING);
    } else {
      this.tooltipPause = element;
    }

    this.playVideo();
    this.initialize();
  }

  private initialize() {
    this.button.setAttribute(Attribute.ROLE, Role.BUTTON);
    this.button.tabIndex = TabIndex.TABBABLE;
    this.icon.tabIndex = TabIndex.NOT_TABBABLE;
    this.setTooltipId();
    this.button.addEventListener(EventType.CLICK, this.togglePlayerState);
    this.button.addEventListener(EventType.KEYDOWN, this.togglePlayerState);
  }

  /**
   * Set default ID value for tooltips if they are not provided.
   */
  private setTooltipId() {
    if (!this.tooltipPlay || !this.tooltipPause) return;
    if (!this.tooltipPlay.id) {
      this.tooltipPlay.id = CssClasses.TOOLTIP_PLAY;
    }
    if (!this.tooltipPause.id) {
      this.tooltipPause.id = CssClasses.TOOLTIP_PAUSE;
    }
  }

  /**
   * Plays video
   */
  async playVideo() {
    try {
      await this.videoContainer.play();
      this.button.classList.add(CssClasses.BUTTON_PAUSE);
      this.button.setAttribute(Attribute.ARIA_LABELLEDBY, this.tooltipPause.id);
    } catch (error: unknown) {
      this.button.classList.remove(CssClasses.BUTTON_PAUSE);
      console.error(error);
    }
  }

  /**
   * Pause video
   */
  pauseVideo() {
    this.videoContainer.pause();
    this.button.classList.remove(CssClasses.BUTTON_PAUSE);
    this.button.setAttribute(Attribute.ARIA_LABELLEDBY, this.tooltipPlay.id);
  }

  /**
   * Checks the state of video and play/pause accordingly.
   * Adds/Removes the class to toggle the text of tooltip and svg icon
   */
  private readonly togglePlayerState = (event: KeyboardEvent | MouseEvent) => {
    if (
      event instanceof KeyboardEvent &&
      event.key !== Key.ENTER &&
      event.key !== Key.SPACE
    ) {
      return;
    }
    if (!this.videoContainer.paused) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  };

  /**
   * Resets component and removes event listeners.
   */
  override destroy() {
    this.button.removeAttribute(Attribute.TAB_INDEX);
    this.button.removeAttribute(Attribute.ARIA_LABEL);
    this.button.removeAttribute(Attribute.ROLE);
    this.icon.removeAttribute(Attribute.TAB_INDEX);
    this.button.removeEventListener(EventType.CLICK, this.togglePlayerState);
    this.button.removeEventListener(EventType.KEYDOWN, this.togglePlayerState);
  }
}

export {AmbientVideo};
