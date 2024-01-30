import {FastifyInstance} from "fastify";
// versions import
import v1 from './v1.0/index'

export default (app : FastifyInstance, prefix: string) => {
    v1(app, prefix + "v1.0");
}