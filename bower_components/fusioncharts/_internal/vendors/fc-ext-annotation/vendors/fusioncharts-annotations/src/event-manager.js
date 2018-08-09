let UNDEF,errorNatures={type:'TypeException',range:'ValueRangeException',impl:'NotImplementedException',param:'ParameterException',run:'RuntimeException',comp:'DesignTimeError',undefined:'UnspecifiedException'},listeners={},lastEventId=0;function managedFnCall(a,b,c,d){try{a[0].call(b,c,d||{})}catch(a){setTimeout(function(){throw a},0)}}function slotLoader(a,b,c){let d,e=0;if(a instanceof Array&&!b.cancelled)for(;e<a.length&&((a[e][1]===b.sender||a[e][1]===UNDEF)&&(d=a[e][1]===b.sender?b.sender:{},managedFnCall(a[e],d,b,c),!0===b.detached&&(a.splice(e,1),e-=1,b.detached=!1)),!0!==b.cancelled);e+=1);}function unpropagator(){this.originalEvent&&this.originalEvent.stopPropagation&&this.originalEvent.stopPropagation.call&&this.originalEvent.stopPropagation()}function unImdPropagator(){this.cancelled=!0,this.originalEvent&&this.originalEvent.stopImmediatePropagation&&this.originalEvent.stopImmediatePropagation.call?this.originalEvent.stopImmediatePropagation():this.originalEvent&&this.originalEvent.stopPropagation&&this.originalEvent.stopPropagation.call&&this.originalEvent.stopPropagation()}function detacher(){return!1==(this.detached=!0)}function undefaulter(){this.defaultPrevented=!0,this.originalEvent&&this.originalEvent.preventDefault&&this.originalEvent.preventDefault.call&&this.originalEvent.preventDefault()}function isDuplicate(a,b,c){let d,e=a.length;for(d=0;d<e;d+=1)if(a[d][0]===b&&a[d][1]===c)return!0}function addListener(a,b,c){var d,e,f;if(a instanceof Array){for(d=[],e=0;e<a.length;e+=1)d.push(addListener(a[e],b,c));return d}return'string'==typeof a?'function'==typeof b?(a=a.toLowerCase(),c?(!c._evtListeners&&(c._evtListeners={}),!(c._evtListeners[a]instanceof Array)&&(c._evtListeners[a]=[]),f=c._evtListeners[a]):(!(listeners[a]instanceof Array)&&(listeners[a]=[]),f=listeners[a]),!isDuplicate(f,b,c))&&(f.push([b,c]),b):void raiseError(c,'03091550','param','::addListener',new Error('Invalid Event Listener')):void raiseError(c,'03091549','param','::addListener',new Error('Unspecified Event Type'))}function removeListener(a,b,c){var d,e;if('function'!=typeof b)return void raiseError(c,'03091560','param','::removeListener',new Error('Invalid Event Listener'));if(a instanceof Array){for(e=0;e<a.length;e+=1)removeListener(a[e],b,c);return}if(d=getListeners(a,c),!!(d instanceof Array&&d.length))for(e=d.length-1;0<=e;e-=1)d[e][0]===b&&d[e][1]===c&&d.splice(e,1)}function triggerEvent(a,b,c,d,e,f){var g,h,i,j,k;return a=a.toLowerCase(),h=getListeners(a,b),i=getListeners('*',b),j=listeners[a],k=listeners['*'],(h&&h.length||i&&i.length||j&&j.length||k&&k.length)&&(g={type:a,eventType:a,eventId:lastEventId+=1,sender:b||new Error('Orphan Event'),stopPropagation:unpropagator,stopImmediatePropagation:unImdPropagator,cancelled:!1,preventDefault:undefaulter,defaultPrevented:!1,originalEvent:d,detached:!1,data:c,detachHandler:detacher},slotLoader(k,g,c),slotLoader(j,g,c),slotLoader(getListeners('*',b),g,c),slotLoader(getListeners(a,b),g,c)),g&&g.defaultPrevented?f&&'function'==typeof f&&f.call(b,g,c||{}):e&&'function'==typeof e&&e.call(b,g,c||{}),!0}function getListeners(a,b){return'string'==typeof a?(a=a.toLowerCase(),b?b._evtListeners&&b._evtListeners[a]:listeners[a]):void raiseError(b,'03091559','param','::removeListener',new Error('Unspecified Event Type'))}function raiseEWEvent(a,b,c,d,e,f){let g,h='#'+b+' '+(a?a.id:'unknown-source')+d+' '+f+' >> ';e instanceof Error?(e.name=errorNatures[c],e.module='FusionCharts'+d,e.level=f,e.message=h+e.message,h=e.message,setTimeout(function(){throw e},0)):h+=e,g={id:b,nature:errorNatures[c],source:'FusionCharts'+d,message:h},triggerEvent(f,a,g)}function raiseError(a,b,c,d,e){raiseEWEvent(a,b,c,d,e,'Error')}export{addListener,removeListener,triggerEvent,getListeners};