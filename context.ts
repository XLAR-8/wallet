// import { FastifyBaseLogger, FastifyRequest } from "fastify";

// import * as _ from "lodash";
// import { IncomingHttpHeaders } from "http";

// export default class RequestContext {
//   log: FastifyBaseLogger;
//   headers: IncomingHttpHeaders;


// constructor(request: FastifyRequest) {
//     this.log = request.log;
//     this.headers = request.headers;
//   }

//   id() {
//     return this.headers["x-request-id"];
//   }


//   getUserId() {
//     return this.headers["user-id"];
//   }

//   static get decorator() {
//     return function (this: FastifyRequest) {
//       return new RequestContext(this);
//     };
//   }
// }
