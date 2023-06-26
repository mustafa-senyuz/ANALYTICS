const { createCanvas } = require('canvas');

function barchartGreen(exist, noexist, nameOFbarchart, pathOFimages) {

    var data = [[exist, noexist]];

    // Colors for the bars
    const colors = ['#00FF00', '#FF0000', '#0000FF'];

    // Dimensions of the canvas and the chart
    const canvasWidth = 150;
    const canvasHeight = 350;
    const chartWidth = 50;
    const chartHeight = 250;
    const chartX = 50;
    const chartY = canvasHeight - chartHeight - 50;
    const barWidth = chartWidth / data.length;
    const barSpacing = 10;
    const maxValue = Math.max(...data.map(d => d.reduce((acc, val) => acc + val, 0)));

    // Create a new canvas
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');


    // Set the background color
    ctx.fillStyle = '#2F6D82';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw the bars and add text labels
    for (let i = 0; i < data.length; i++) {
        let y = chartY + chartHeight;
        for (let j = 0; j < data[i].length; j++) {
            let barHeight = data[i][j] / maxValue * chartHeight;
            ctx.fillStyle = colors[j];
            ctx.fillRect(i * barWidth + chartX + barSpacing / 2, y - barHeight, barWidth - barSpacing, barHeight);

            // Add text label for the percentage value of each segment
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const percentage = `${((data[i][j] / maxValue) * 100).toFixed(0)}%`;
            const x = i * barWidth + chartX + barWidth / 2;
            const yLabel = y - barHeight / 2;
            ctx.fillText(percentage, x, yLabel);

            y -= barHeight;
        }
    }

    // Save the chart as a PNG image
    const buffer = canvas.toBuffer('image/png');
    require('fs').writeFileSync(`${pathOFimages}/${nameOFbarchart}.png`, buffer);  // C:/ANALYTICS/speedata/ZIMA/1681314060122-e392495036b31fa3ac02/images

}

module.exports = { barchartGreen }