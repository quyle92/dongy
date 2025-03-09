import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(" "); //https://stackoverflow.com/a/32589289/11297747
}

//shorten paragraph from "abc xyx" to "abc..."
export function trimParagraph(paragraph, globalFilter, length = 100) {
    //trim the string to the maximum length
    const trimmedString = paragraph.substr(0, length);

    //re-trim if we are in the middle of a word
    return (
        trimmedString.substr(
            0,
            Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")),
        ) + "..."
    );
}

export function extractWithContext(paragraph, term, contextLength = 50) {
    const index = paragraph.toLowerCase().indexOf(term.toLowerCase());

    if (index === -1) {
        // Term not found, fallback to trimming the paragraph
        return trimParagraph(paragraph, contextLength * 2);
    }

    const start = Math.max(0, index - contextLength);
    const end = Math.min(paragraph.length, index + term.length + contextLength);

    return (
        (start > 0 ? "..." : "") +
        paragraph.substring(start, end).trim() +
        (end < paragraph.length ? "..." : "")
    );
}

//http://abc.com?foo=bar => http://abc.com
export function cleanUrl(url) {
    return url.split("?")[0];
}

export const swalConfirmBox = () => {
    return MySwal.fire({
        title: "Are you sure to proceed?",
        showCancelButton: true,
        confirmButtonText: "Save",
    });
};

export function removeHTMLTags(htmlString) {
    // eslint-disable-next-line no-undef
    const parser = new DOMParser();
    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, "text/html");
    // Extract text content
    const textContent = doc.body.textContent || "";
    // Trim whitespace
    return textContent.trim();
}
