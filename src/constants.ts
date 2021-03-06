import {actionNameBuilder} from "@uxland/uxl-redux";
import {constantBuilder} from '@uxland/uxl-utilities';
const prefix = 'uxl-prism';
export const actionsBuilder = (action: string) =>{
  const builder = actionNameBuilder(prefix);
  return builder(action);
};
const eventNameBuilder = constantBuilder(prefix, 'event');
export const eventsBuilder = (event: string) => eventNameBuilder(event);


