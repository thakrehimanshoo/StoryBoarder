//here i have created whiteboard using canvas and js

function drawBackground() {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f0f0f0'; // Light grey color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
canvas.width = 711 ;
canvas.height = 350;
drawBackground() //backgrind color of canvas


let isDrawing = false;
let lastX = 0;
let lastY = 0;

//funcaion to draw on canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}
isErasing = false;
function erase() {
    isErasing = !isErasing;
    if (isErasing) {
        document.getElementById('eraser').style.backgroundColor = '#d0d0d0';
        document.getElementById('eraser').style.color = '#282828';
    } else {
        document.getElementById('eraser').style.backgroundColor = '#282828';
        document.getElementById('eraser').style.color = '#d0d0d0';
    }
}

function draw(e) {
    if (!isDrawing) return;
    if (isErasing) {
        context.strokeStyle = '#fff'; // Set erasing color to white
    } 
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}
//function to save and display images on webpage, also i have converted images to data urls for converting them into pdf 
function takeSnapshotAndSave() {
    
    canvas.toBlob(function(blob) {
     
        const blobUrl = URL.createObjectURL(blob);

        clearCanvas() //after clicking save button clearing the canvas
        delempty()
        displayImage(blobUrl);
    }, 'image/jpeg');
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function delempty(){
    const elementToDelete = document.getElementById('pree');
        if(elementToDelete) elementToDelete.remove();
}

// Function to display image on webpage
const imageDataUrls = [];
function displayImage(blobUrl) {
    // Create image element
    const image = document.createElement('img');

    // Set src attribute to Blob URL
    image.src = blobUrl;

    // Get reference to the image section
    const imageSection = document.getElementById('imageSection');

    // Append image to the image section
    imageSection.appendChild(image);

    fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onload = function() {
                imageDataUrls.push(reader.result);
            };
            reader.readAsDataURL(blob);
        });
}
// Function to convert images to PDF and download it
function print() {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Counter to keep track of images processed
    let imagesProcessed = 0;

    // Function to handle conversion of each data URL image to PDF
    function processImageToPDF(dataUrl) {
        // Create a new Image object
        const img = new Image();

        // Set the src of the image to the data URL
        img.src = dataUrl;

        // Event listener for image load
        img.onload = function() {
            // Add image to PDF
            if (imagesProcessed > 0) {
                pdf.addPage(); // Add new page for each image except the first one
            }
            pdf.addImage(dataUrl, 'JPEG', 10, 10, 180, 150); // Add image to PDF

            // Increment imagesProcessed counter
            imagesProcessed++;

            // If all images are processed, save and download the PDF
            if (imagesProcessed === imageDataUrls.length) {
                // Save PDF with filename
                pdf.save('images.pdf');
            }
        };
    }

    // Loop through each data URL and convert it to PDF
    imageDataUrls.forEach(dataUrl => {
        processImageToPDF(dataUrl);
    });
}



function homefync(){
    window.location.href = "index.html";
}
function contactfunc(){
    window.location.href = "https://www.linkedin.com/in/himanshoo-thakre-84644b227/";
}