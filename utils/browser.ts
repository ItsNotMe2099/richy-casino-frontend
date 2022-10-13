export class BrowserUtils {

  static getColorDepth(): number {
    try {
      return typeof screen !== 'undefined' && screen?.colorDepth ? screen?.colorDepth : 24
    } catch (e) {
      return 24
    }
  }

  static getScreenSize(): { width?: number, height?: number } {
    try {
      return {
        height: window.screen.height,
        width: window.screen.width
      }
    } catch (e) {
      return {}
    }
  }

  static getUserAgent(): string | null {
    try {
      return window.navigator.userAgent
    } catch (e) {
      return null
    }
  }

  static getDetailsForPayment(lang?: string) {
    return {
      color_depth: BrowserUtils.getColorDepth(),
      screen_height: BrowserUtils.getScreenSize()?.height,
      screen_width: BrowserUtils.getScreenSize()?.width,
      user_agent: BrowserUtils.getUserAgent(),
      language: lang,
      timezone_offset: (new Date()).getTimezoneOffset(),
      java_enabled: true,
    }
  }
}
