# Image Optimization

A comprehensive tool for optimizing images to improve performance and reduce file size without sacrificing quality. This project offers various features to enhance images for web and mobile applications. The best part is it works directly with url params like `(url-to-image)?width=1000`

## Features

- **Compression**: Reduce image file sizes while maintaining visual quality.
- **Resizing**: Adjust image dimensions to fit specific requirements.
- **Format Conversion**: Convert images between different formats (e.g., PNG, JPEG, WebP) for better performance.
- **Batch Processing**: Optimize multiple images at once.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pulkitxm/image-tweaker.git
   cd image-tweaker
   cd client
    ```
2. Using docker (**Note:** Ensure Docker is installed and running on your machine before executing the `docker compose up` command. This will build and start the necessary containers for the application. Also the .env files must be added into client and server.)

    ```bash
    docker compose up
    ```

You can find the docker images directly at: [@pulkitxm/image-optimization-client](https://hub.docker.com/r/pulkitxm/image-optimization-client) and [@pulkitxm/image-optimization-server](https://hub.docker.com/r/pulkitxm/image-optimization-server)

# Technologies Used

This project leverages various technologies and tools to achieve efficient image optimization. Below is a list of the key technologies used:

## Programming Languages

- **JavaScript**: Used for scripting and implementing the core functionalities of the image optimization tool.
- **Node.js**: Provides the runtime environment for executing JavaScript code on the server side.

## Libraries and Frameworks

- **FFmpeg**: A powerful multimedia framework used for handling image and video processing tasks. It helps in resizing, compressing, and converting images.
- **ImageMagick**: A robust image manipulation tool used for performing a variety of operations on images, such as resizing and format conversion.

## Tools

- **npm**: The package manager used for managing dependencies and running scripts in the project.
- **yarn**: An alternative package manager to npm, providing faster installation and additional features.
- **jimp**:  A JavaScript image processing library for Node.js. It provides functionality for image manipulation tasks like resizing, cropping, and color adjustments. Jimp is lightweight and easy to use for various image operations.

## Development Tools

- **Visual Studio Code**: An integrated development environment (IDE) used for coding and debugging.
- **Git**: A version control system used for tracking changes in the project and collaborating with others.

## Hosting and Deployment

- **GitHub**: Used for hosting the project repository and managing code versions.
- **Docker**: Facilitates deployment by creating containerized environments that encapsulate the application and its dependencies.

## Other

- **Markdown**: Used for writing documentation files such as `README.md` and `TECHNOLOGIES.md`.

These technologies work together to provide a robust solution for optimizing images, enhancing performance, and ensuring high-quality results.
