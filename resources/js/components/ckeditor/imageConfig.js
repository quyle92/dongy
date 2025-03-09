export const imageConfig = {
    resizeOptions: [
        {
            name: "resizeImage:original",
            label: "Default image width",
            value: null,
        },
        {
            name: "resizeImage:50",
            label: "50% page width",
            value: "50",
        },
        {
            name: "resizeImage:75",
            label: "75% page width",
            value: "75",
        },
        {
            name: "resizeImage:custom",
            value: "custom",
            icon: "custom",
        },
    ],
    toolbar: [
        "resizeImage",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "toggleImageCaption",
    ],
};
