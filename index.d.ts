declare module "react-native-add-calendar-event" {
  interface NavigationBarIOS {
    tintColor: string;
    barTintColor: string;
    backgroundColor: string;
    translucent: boolean;
    titleColor: string;
  }

  interface CreateOptions {
    title?: string;
    /**
     * in UTC, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
     */
    startDate?: string;
    /**
     * in UTC, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
     */
    endDate?: string;
    location?: string;
    allDay?: boolean;
    /**
     * iOS only
     */
    url?: string;
    /**
     * The notes (iOS) or description (Android) associated with the event.
     */
    notes?: string;
    navigationBarIOS?: NavigationBarIOS;
  }

  /**
   * These are two different identifiers on iOS.
   * On Android, where they are both equal and represent the event id, also strings.
   */
  interface SuccessAction {
    action: "SAVED";
    calendarItemIdentifier: string;
    eventIdentifier: string;
  }

  interface CancelAction {
    action: "CANCELED";
  }

  interface DeletedAction {
    action: "DELETED";
  }

  interface DoneAction {
    action: "DONE";
  }

  interface RespondedAction {
    action: "RESPONDED";
  }

  type CreateResult = SuccessAction | CancelAction;

  interface PredicateOptions {
    startDate: string;
    endDate: string;
  }

  interface EditOptions {
    /**
     * Id of edited event.
     */
    eventId: string;
    /**
     * `ACTION_EDIT` should work for editing events but this doesn't always seem to be the case.
     * This option leaves the choice up to you. By default, the module will use `ACTION_VIEW` which will only
     * show the event, but from there it is easy for the user to tap the edit button and make changes.
     */
    useEditIntent?: boolean;
    navigationBarIOS?: NavigationBarIOS;
    /** Predicate to filter the event before editing. Useful to select a recurrent event instance. */
    predicate?: PredicateOptions;
  }

  type EditResult = SuccessAction | CancelAction | DeletedAction;

  interface ViewOptions {
    /**
     * Id of edited event.
     */
    eventId: string;
    /**
     * iOS only
     * https://developer.apple.com/documentation/eventkitui/ekeventviewcontroller/1613964-allowsediting?language=objc
     */
    allowsEditing?: boolean;
    /**
     * iOS only
     * https://developer.apple.com/documentation/eventkitui/ekeventviewcontroller/1613956-allowscalendarpreview?language=objc
     */
    allowsCalendarPreview?: boolean;
    navigationBarIOS?: NavigationBarIOS;
    /** Predicate to filter the event before viewing. Useful to select a recurrent event instance. */
    predicate?: PredicateOptions;
  }

  type ViewResult = DoneAction | RespondedAction | DeletedAction;

  export function presentEventCreatingDialog(
    options: CreateOptions
  ): Promise<CreateResult>;
  export function presentEventEditingDialog(
    options: EditOptions
  ): Promise<EditResult>;
  export function presentEventViewingDialog(
    options: ViewOptions
  ): Promise<ViewResult>;

}
