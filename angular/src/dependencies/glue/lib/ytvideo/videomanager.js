/**
 * Manages a collection of YouTube videos. Also manages the YouTibe Video API.
 */
class YoutubeVideoManager {
  constructor() {
    this.videoObjects = new Map();
  }
  static getManager() {
    if (!YoutubeVideoManager.instance) {
      YoutubeVideoManager.instance = new YoutubeVideoManager();
    }
    return YoutubeVideoManager.instance;
  }
  static destroyManager() {
    YoutubeVideoManager.instance = undefined;
  }
  /**
   * Stores the YouTube player object
   * @param id The id of a player.
   * @param player The player instance.
   */
  registerYtPlayer(id, player) {
    this.videoObjects.set(id, player);
  }
  /**
   * Destroy a player.
   * @param id The id of a player.
   */
  unregisterYtPlayer(id) {
    const player = this.videoObjects.get(id);
    player === null || player === void 0 ? void 0 : player.destroy();
    this.videoObjects.delete(id);
    // If we just destroyed the last video, then the manager
    // should destroy iteself since it now manages nothing.
    if (this.videoObjects.size === 0) {
      YoutubeVideoManager.destroyManager();
    }
  }
  /**
   * Get YouTube player object.
   * @param id The id of a player.
   */
  getYtPlayer(id) {
    return this.videoObjects.get(id);
  }
}
YoutubeVideoManager.instance = undefined;
export {YoutubeVideoManager};
