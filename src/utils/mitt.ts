/**
 * copy to https://github.com/developit/mitt
 * expand clear method
 */

 export type EventType = string | symbol

 // an event handler can take an optional event argument
 // and should not return a value
 export type Handler<T = any> = (event?: T) => void
 export type WildcardHandler = (type: EventType, event?: any) => void
 
 // an array of all currently registered event handlers for a type
 export type EventHandlerList = Array<Handler>
 export type WildCardEventHandlerList = Array<WildcardHandler>
 
 // a map of event types and their corresponding event handlers
 export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>
 
 export interface Emitter {
   all: EventHandlerMap
 
   on<T = any>(type: EventType, handler: Handler<T>): void
   on(type: '*', handler: WildcardHandler): void
 
   off<T = any>(type: EventType, handler: Handler<T>): void
   off(type: '*', handler: WildcardHandler): void
 
   emit<T = any>(type: EventType, event?: T): void
   emit(type: '*', event?: any): void
   clear(): void
 }
 
 /**
  * mitt: tiny (~200b) functional event emitter / pubsub
  * @name mitt
  * @returns {Mitt}
  */
 export default function mitt(all?: EventHandlerMap): Emitter {
   all = all || new Map();
 
   return {
     /**
      * a Map of event names to registered handler functions
      */
     all,
 
     /**
      * register an event handler for the given type
      * @param {string|symbol} type type of event to listen for, or `"*"` for all events
      * @param {Function} handler function to call in response to given event
      * @memberOf mitt
      */
     on<T = any>(type: EventType, handler: Handler<T>) {
       const handlers = all?.get(type)
       const added = handlers && handlers.push(handler)
       if (!added) {
         all?.set(type, [handler])
       }
     },
 
     /**
      * remove an event handler for the given type
      * @param {string|symbol} type type of event to unregister `handler` from, or `"*"`
      * @param {Function} handler handler function to remove
      * @memberOf mitt
      */
     off<T = any>(type: EventType, handler: Handler<T>) {
       const handlers = all?.get(type)
       if (handlers) {
         handlers.splice(handlers.indexOf(handler) >>> 0, 1)
       }
     },
 
     /**
      * invoke all handlers for the given type
      * if present, `"*"` handlers are invoked after type-matched handlers
      *
      * note: manually firing "*" handlers is not supported
      *
      * @param {string|symbol} type the event type to invoke
      * @param {Any} [evt] any value (object is recommended and powerful), passed to each handler
      * @memberOf mitt
      */
     emit<T = any>(type: EventType, evt: T) {
       ((all?.get(type) || []) as EventHandlerList).slice().map((handler) => {
         handler(evt)
       });
       ((all?.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => {
         handler(type, evt)
       })
     },
 
     /**
      * clear all
      */
     clear() {
       this.all.clear()
     }
   }
 }
 