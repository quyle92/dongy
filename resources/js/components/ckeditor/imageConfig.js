export const imageConfig = {
    resizeOptions: [
        {
            name: "resizeImage:100",
            label: "100% page width",
            value: "100",
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
            name: "resizeImage:original",
            label: "Default image width",
            value: null,
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
