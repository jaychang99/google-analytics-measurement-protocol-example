type GaConsent = 'GRANTED' | 'DENIED';
type GaEvent<TCustomEventParams> = {
  name: string;
  params: {
    campaign_id?: string;
    campaign?: string;
    source?: string;
    medium?: string;

    debug_mode?: boolean;

    /**
     * In order for user activity to display in reports like Realtime, engagement_time_msec and session_id must be supplied as part of the params for an event
     * The engagement_time_msec parameter should reflect the event's engagement time in milliseconds.
     */
    engagement_time_msec?: number;

    /**
     * In order for user activity to display in reports like Realtime, engagement_time_msec and session_id must be supplied as part of the params for an event
     */
    session_id?: string | number;
  } & TCustomEventParams;
};

export interface GaMeasurementProtocolPayload<TCustomEventParams = unknown> {
  /**
   * A unique identifier for a client. This is different than a Firebase app_instance_id. Use gtag.js('get').
   */
  client_id: string | number;

  /**
   * Optional. A unique identifier for a user. Can only contain UTF-8 characters. See User-ID for cross-platform analysis for more information about this identifier.
   */
  user_id?: string | number;

  /**
   * Optional. Learn how to set consent settings.
   */
  consent?: {
    /**
     * Optional. Sets consent for sending user data from the request's events and user properties to Google for advertising purposes.
     */
    ad_user_data?: GaConsent;

    /**
     * Optional. Sets consent for personalized advertising for the user.
     */
    ad_personalization?: GaConsent;
  };
  /**
   * Optional. The Unix epoch time, in microseconds, for the events and user properties in the request. If not specified, defaults to the time of the request.
   */
  timestamp_micros?: number;

  /**
   * An array of event items. You can include multiple events in one request.
   * In order for user activity to display in reports like Realtime, engagement_time_msec and session_id must be supplied as part of the params for an event.
   * The engagement_time_msec parameter should reflect the event's engagement time in milliseconds.
   */
  events: GaEvent<TCustomEventParams>[];
}
