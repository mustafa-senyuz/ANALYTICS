const { createCanvas, loadImage } = require('canvas');

function piechart(values, areas, nameOFpiechart, pathOFimages) {    // arrays and 1 string path

    // Total value of all data points
    const total = values.reduce((a, b) => a + b, 0);

    // Dimensions of canvas
    const width = 600;
    const height = 400;

    // Create a new canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // Set background color
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);

    // Set chart parameters
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    let startAngle = 0;
    let endAngle = 0;

    // Draw pie chart and area names
    for (let i = 0; i < values.length; i++) {
        endAngle = startAngle + (Math.PI * 2 * (values[i] / total));
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.fillStyle = getRandomColor();
        context.fill();
        context.rect(width - 125, 50 + i * 25, 10, 10);
        context.fill();
        context.fillStyle = '#000';
        context.font = '14px Arial';
        context.fillText(areas[i], width - 110, 60 + i * 25);
        startAngle = endAngle;


    }



    // Write percentage values at the midpoint of each slice
    for (let i = 0; i < values.length; i++) {
        endAngle = startAngle + (Math.PI * 2 * (values[i] / total));
        const midAngle = (startAngle + endAngle) / 2;
        const percentage = ((values[i] / total) * 100).toFixed(2);
        const x = centerX + (radius * 0.6) * Math.cos(midAngle);
        const y = centerY + (radius * 0.6) * Math.sin(midAngle);
        context.fillStyle = '#000';
        context.font = '16px Arial';
        context.textAlign = 'center';
        context.fillText(percentage + '%', x, y);
        startAngle = endAngle;
    }


    // Save the chart as a PNG image
    const buffer = canvas.toBuffer('image/png');
    require('fs').writeFileSync(`${pathOFimages}/${nameOFpiechart}.png`, buffer);
    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


}

module.exports = { piechart }