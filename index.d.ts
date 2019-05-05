import { string } from "prop-types";

interface Files {
    label: string;
    file: string;
}
interface Response {
    cookie: string;
    sources: Files[]
}
declare function getStreamFiles(id: string): Response;