import {actionNameBuilder} from "@uxland/uxl-redux/action-name-builder";
import {constantBuilder} from '@uxland/uxl-utilities/constant-builder';
const prefix = 'uxl-prism';
export const actionsBuilder = (action: string) =>{
  const builder = actionNameBuilder(prefix);
  return builder(action);
};
const eventNameBuilder = constantBuilder(prefix, 'event');
export const eventsBuilder = (event: string) => eventNameBuilder(event);


