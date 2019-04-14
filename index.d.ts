import { string } from "prop-types";

interface Files {
    label: string;
    file: string;
}
declare function getFiles(id: string): Files[];