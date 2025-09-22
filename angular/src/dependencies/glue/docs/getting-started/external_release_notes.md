# Glue Release Notes

## v28.0.0 (2024-04-15)

### Bug Fixes, Code Cleanup etc.

- Filter: Fix MWC3 radio instances so you can't uncheck them
- YtVideo: Unable to play video with enter key on Mozilla Firefox browser
- A11Y-Glue-Breadcrumbs: Decorative SVG images should be hidden from screen
  reader.
- Header: Ham menu options are not getting highlighted for Single & Double Tier
  Flagship without CTA
- Header: Keyboard navigation within a stepped nav is inconsistent
- A11Y-Glue-Social: - Lighthouse displays error - Skip links are not focusable
- Popover: Auto-adjust popover positioning
- Filter: Remove focus from Clear All button when hidden
- Header: disable placeholder links
- Header: Ham menu options are not getting highlighted for Single & Double Tier
  Flagship without CTA
- YouTube video player :- Youtube components having HCM Black and White theme
  issues
- Header: Allow custom breakpoints for rendering
- Base: Update emitter function in base component
- Filter: Ensure ResetAll buttons show when at least 1 filter is selected
- Jumplinks: update focus state
- Ambient Video: set aria labelledby for the control button
- Filter: Updates for vertical filter modal.
- YouTube: Code cleanup - Remove unused constant.
- Copy: Reset copy when its popover parent closes
- Tooltip / Popover: Don't override aria-controls value
- Jumplinks: resolve the link alignment and double highlighted link issues
- Fix <code> accessibility color contrast violation.
- YTVideo: Respect .glue-cards--border

### Features

- Header: Active transparent animation resets background before the box-shadow
- Filter: Add method to parse json string as card result match
- Header: Active transparent header does not have a drop shadow
- Filter: Fix expansion panel title height (mobile)
- MWC3: Update Filter to use MWC3 components
- MWC: Add Material 3 inputs to focusUtil
- MWC3: Update form layout component
- MWC3: Add Textfield MWC3 component
- MWC3: Add Select MWC3 component
- MWC3: Add Switch MWC3 component
- MWC3: Add Radio MWC3 component
- MWC3: Add Checkbox MWC3 component
- MWC3: Add Glue theme for MWC3 components
- Typography: Use Google Sans fonts for Arabic, CJK languages
- Footer: Focus border is overlapped on small viewports
- Header: Inconsistent visibility on page load
- Header: Links not visible when focused
- Popover: Adding label to popover dialog
- Carousel: Carousel demo for YTVideo card and modal card
- YTVideo: Changed trigger element to always be root element
- Icons: Add copies of social icon with cleaner names
- Social: Change Twitter to X

### Breaking Changes

- Filter: Accessibility and functionality fixes for chips

## v27.1.0 (2023-06-29)

### Bug Fixes, Code Cleanup etc.

-   Cookie Notification Bar: Add HCM styles
-   Header: Fix variable import path
-   Header: Updates for selected link style for HCM.
-   Jumplinks: support absolute path in links
-   Social/Copy - when the copy popover closes, need to reset contents of
    popover

### Features

-   Copy: Update clipboard API to window.navigator
-   Header: Order-dependent test
-   Jumplinks: Reduce VRT flakes

## v27.0.0 (2023-04-24)

### Bug Fixes, Code Cleanup etc.

-   Ambient Video: set button role in TS
-   Banner: Add no-JS styles
-   Banner, Footer: Misc a11y updates to demos per QA
-   Buttons: Create high emphasis partials
-   Carousel: add an option to disable dragging on desktop
-   Carousel: disable dragging for right clicks
-   Carousel: fix a11y issues
-   Carousel: Fix cropping of borders for cards
-   CDN: Merge glue namespace
-   Cookie Notification Bar: Use hl for language setting
-   Correct types and update CDN unit tests and docs
-   Filter: Fix vertical filter group display on desktop
-   Fix issue where the dummy slide in the cyclical carousel animates when it's
    added creating unwanted movement in the slide container.
-   Jumplinlks : Updated buttons on horizontal scrolling.
-   Links: Move partials into own library
-   Modal: remove requirement of the close button.
-   Social: Update 'share link' icon color
-   Tooltip: Adjust font weight of rich tooltips
-   Tooltip: Fix RTL positioning issue
-   Tooltip: Remove automatic tabindex setting
-   Typography: Move partials into own library

### Features

-   Ambient Video: add lit-html templates
-   Buttons : Updated button styles to match GM3.
-   Carousel: remove attributes after destroying the component
-   Expansion Panels: create lit-html templates
-   Header: Adding transparent header variation
-   Modal: add modal templates
-   Modal: allow users to change the focus element after modal is closed
-   Modal: set aria attributes and add the destroy method
-   YTVideo lit-html template demos
-   YTvideo scuba tests

### Breaking Changes

-   Filter: Add styles and features to filter
-   Filter: Class/property renaming and DOM adjustments
-   Popover: set visibility to internal only.
-   YTVideo lit-html template

## v26.0.0 (2022-09-07)

### Bug Fixes, Code Cleanup etc.

-   Alignment: Update RTL styles
-   AmbientVideo : Light theme is not working properly in Ambient Video
-   Ambient Video/Modal: Updates to the ambient video and video components as
    per designs.
-   Ambient video: Update RTL styles
-   Banner: Add transition to close button on hover out
-   Banner: expose Close method API
-   Breadcrumbs: Update RTL styles
-   Build Glue JS files and type definitions
-   Cards: Update RTL styles
-   Carousel: Fix card border not getting displayed on mobile devices
-   Carousel: Increase touch target area for carousel dots.
-   Carousel: prevent flickering during slides transition
-   Carousel: Update RTL styles
-   Cleanup: correct Glue component interfaces
-   Clean up setAttribute violations in Glue.
-   Copy, Social: (A11y) Add aria-label to text input
-   Correct private fields and remove unused methods
-   Easing: export name for each easing function
-   Expansion Panels: Fix animation bug
-   Expansion Panels: Update RTL Styles
-   Fixing Accessibility issue.
-   Footer: Update RTL styles
-   Forms: Update RTL styles
-   Grids: Update RTL styles
-   Header: add pointer event listeners when drawer is open
-   Header: adjust the position of CTA buttons
-   Header: disable site switcher functionality when drawer is open
-   Header: dismiss drawer with screen reader
-   Header: dispatch events when header shows and hides
-   Header: fix mouse event listener in the drawer
-   Header: Fix order dependent test issue for header component.
-   Header: fix the 2nd tier nav in Glue header.
-   Header: prevent page scroll when drawer is open
-   Header: reset transition when drawer receives clicks
-   Header: Update aria-label for the stepped nav links to "[Link Name],
    Navigate back to parent menu, [Link Name] opened".
-   Header: Update RTL styles
-   Icons, Social: Adjust sizes of new Facebook, LinkedIn icons
-   Icons, Social: Update Facebook, Linkedin social icons
-   Icons: Update RTL styles
-   Jumplinks: Update aria-label for the jumplinks to "[Link Name] - Jump to
    section within page".
-   Jumplinks: Update RTL styles
-   Lit template - Popover
-   Lit templates - Footer
-   Match standards demo wrapper structure with glue demos
-   Modal: Fix focus outline on close button
-   Modal: Update RTL styles
-   Popover: use general string type for placeholder
-   Remove the tabindex attribute from the tabpanels on the Glue tabs component.
-   Remove xlink:href attribute
-   Social: Update RTL styles
-   Tables: Update RTL styles
-   Tabs: Update RTL styles
-   Tooltip: Adjust font weight of rich tooltips
-   Tooltip: fix a11y issues from lighthouse audit
-   Tooltip: Minor design adjustments
-   Tooltip: Support using Escape key to dismiss the tooltip
-   Typography: Update RTL styles
-   - Updated aria-label for play/pause button state
-   Update Glue CDN type definitions and CDN demo.
-   Update Glue Tabs so it only captures events fired on Tabs
-   Update the tabs component to match the automatic tabs example on W3 ARIA

### Features

-   add AmbientVideo to cdn tests
-   Add a script to auto generate CDN types
-   Banner : Create a new component for Banner.
-   Carousel: Fix keyboard access for cards.
-   Expose observer property for Tabs and Carousel
-   Header: add drag and swipe to the drawer
-   Header: allow Enter key press on the backdrop to close the drawer
-   Header: improve component accessibility
-   Jumplinks: add a new config option to support dynamic header height
-   Lit templates - base templates
-   Social: Add persistent social variant (code)
-   Social: Add persistent social variant (tests)
-   Tooltip: Add new component for tooltips
-   Tooltip: Updates, QA and A11y fixes
-   TS code updates and cleanup:

### Breaking Changes

-   Footer: sitelinks merge (styles)
-   Footer: sitelinks merge (TS)
-   Icons: Remove unused icon classes
-   Move expansionPanelsPanelGroup to root of ExpansionPanels
-   Popover: remove the trigger mode option
-   Remove visibility of Glue Easing
-   Social: Update DOM, SCSS, and TS setup

## v25.0.0 (2022-02-23)

### Bug Fixes, Code Cleanup etc.

-   Breadcrumbs : Touch target area is improved for all breadcrumb links by
    adding padding top and bottom.
-   Breadcrumbs: Adjust high contrast mode styles
-   Buttons, Links: Consolidate HCM styles and make them consistent
-   Cards: Adjust high contrast mode styles
-   Carousel: Add a standards demo wrapper for cards
-   Carousel: Adjust high contrast mode styles
-   Carousel: fix crash issue on tablet viewport when cardsPerPage is set to 1
-   Carousel: Fix navigation buttons within iOS Voiceover.
-   Cleanup: Update components to use global constants files
-   Expansion Panels, Footer, Header: Fix ability to override scss variables
-   Expansion Panels, Footer: Fix ability to override scss variables
-   Expansion panels: Adjust high contrast mode styles
-   Expansion Panels: Fix bug with arrow size when title is 2+ lines
-   Fix focus modes on carousel for Windows high contrast mode
-   Footer: Adjust high contrast mode styles
-   Header is display properly after Text Spacing on site
-   Header: Adjust styles for high contrast mode
-   Header: fix the 2nd tier nav in Glue header.
-   Hotfix for ResponsiveMonitor compiler error
-   Jumplinks: Adjust high contrast mode styles
-   Jumplinks: Fix scroll for arrow click on resize
-   Math: fix order dependency
-   Order-dependent test fixes for Popover and Filter
-   Popover: add reverse tab navigation
-   Remove tabIndex and title from setAttribute.
-   Social: Adjust high contrast mode styles
-   stepped nav accessibility improvements and refactor
-   Tables : Screen reads meaningful stacked table content on Android device in
    Portrait mode.
-   Tables: a11y fix for stacked tables in Safari/VoiceOver
-   Tables: Fix rendering in Windows High Contrast Mode
-   Tabs, Tabpanels: Adjust high contrast mode styles
-   Typography: Update font sizes to use rem values

### Features

-   Accessibility: Add mixins and variables for High Contrast Mode
-   add CDN docs for Filter State Manager and update CDN namespaces
-   Ambient Video : Create a new component for ambient video.
-   Ambient Video Component fixes based on documentation cl/415178656
-   Replace Filter Model with Observer

### Breaking Changes

-   Header: refactor Site Switcher and Deep Nav components
-   YTVideo: Add video preview elements

## v24.0.0 (2021-08-26)

### Bug Fixes, Code Cleanup etc.

-   Selected status of tab is visible with high contrast mode
-   Show close button in high contrast mode
-   Set focus to the popover trigger button when it opens the dialog.
-   Hide the pseudo element from the screen reader
-   Update expansion panel component
-   Show the close button when pressing Tab key
-   Hide the popover close button from drawer.
-   Register the click event when dialog is open
-   Remove aria-label from Social copy input element
-   Update social component
-   Recognize a drag gesture after a certain amount of pixels.
-   Update labels of social share links
-   Set the default active link if no jumplinks content is present on the page
-   Add type guard for TouchEvent.
-   Fix expansion panels toggle all button
-   Fix Jumplinks RTL rendering
-   Tabpanels: Expose subcomponent APIs
-   Glue typography misc updates
-   Resolve the highlight issue in DeepNav with the single tier Header
-   Resolve Responsive Monitor properties obfuscation issue in runtime.
-   Refactor ytVideo component
-   Disable 'Enter' keydown handler for popover button element
-   Remove background behind footer logo unless in high contrast mode
-   Align header modifier to the right on small viewport
-   Footer global section height fix

### Features

-   Add Cards Carousel component.
-   Add touch feature and remove HammerJS from Carousel.

### Breaking Changes

-   Refactor Header demos and update Header documentations.
-   Deprecate updateCurrent in favor of setCurrentSlide
-   Glue Header Cleanup
-   Expansion panels a11y fixes
-   Resolve carousel a11y bugs
-   Remove gray background from parent menu items on mobile

<!--* freshness: { exempt: true } *-->
