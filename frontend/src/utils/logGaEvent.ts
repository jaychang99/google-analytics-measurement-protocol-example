type EventName = 'custom_button_click';
type EventParams = Record<string, string | number | boolean>;

type LogGaEvent = (eventName: EventName, eventParams: EventParams) => void;

export const logGaEvent: LogGaEvent = (eventName, eventParams) => {
  window.gtag('event', eventName, eventParams);
};
