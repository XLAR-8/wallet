import { FastifyReply } from "fastify";
import {AxiosError} from "axios";

import WalletError, { WalletErrorCode } from "../../utils/WalletError";

export default abstract class BaseController {

  public ok<T>(res: FastifyReply, dto?: T) {
    if (dto) {
      const dtoWithBigIntAsString = JSON.parse(JSON.stringify(dto, (_, v) => 
        typeof v === 'bigint' ? v.toString() : v
      ));
      res.type("application/json");
      return res.status(200).send(dtoWithBigIntAsString);
    } else {
      return res.status(200);
    }
}

  public fail<T>(res: FastifyReply, error: AxiosError<any,T> | WalletError | Error): FastifyReply {
    let message: string = error.toString();
    let status: number = 500
    const errorHandlers: Record<WalletErrorCode, () => FastifyReply> = {
      409: () => this.conflict(res, message),
      400: () => this.inValid(res, message),
      404: () => this.notFound(res, message),
      403: () => this.forbidden(res, message),
      500: () => res.status(status).send({ message: message })
    }
    if (error instanceof WalletError) {  
      return errorHandlers[error.code]()
    } else {
      return errorHandlers[500]()
    }
  }

  private notFound<T>(res: FastifyReply, message: string) {
    return res.status(404).send({
      message: message ? message : "Not Found",
    });
  }

  private forbidden<T>(res: FastifyReply, message: string) {
    return res.status(403).send({
      message: message ? message : "Forbidden",
    });
  }

  private conflict<T>(res: FastifyReply, message: string) {
    return res.status(409).send({
      message: message ? message : "Conflict",
    });
  }

  private inValid<T>(res: FastifyReply, message: string) {
    return res.status(400).send({
      message: message ? message : "Bad Request",
    });
  }
}
