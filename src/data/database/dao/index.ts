
import mysqlClient from "../mysql"
import MasterDao from "./MasterDao";

const MasterDBDao = new MasterDao(mysqlClient)


export { MasterDBDao }