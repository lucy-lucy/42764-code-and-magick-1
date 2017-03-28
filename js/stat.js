'use strict';

var drawCloud = function (ctx, x, y, width, height) {
  var offset = 20;

  ctx.beginPath();
  ctx.moveTo(x + offset, y);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width - offset, y + height);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

var drawHisto = function (ctx, time, name, i, histoHeight, histoX, step) {
  var columnWidth = 40;
  var columnIndent = 50;
  var columnNextPos = columnWidth + columnIndent;

  var columnHeight = step * time;

  ctx.fillText(time.toFixed(0), histoX + columnNextPos * i, columnNextPos + histoHeight - columnHeight);

  ctx.fillStyle = isUserName(name) ? 'rgba(255, 0, 0, 1)' : getRandomBlueColor();
  ctx.fillRect(histoX + columnNextPos * i, 100 + histoHeight - columnHeight, columnWidth, columnHeight);

  ctx.fillStyle = '#000';
  ctx.fillText(name, histoX + columnNextPos * i, histoHeight * 2 - 30);
};

var printWrappedText = function (ctx, text, x, y, maxWidth) {
  var words = text.split(' ');
  var line = '';

  words.forEach(function (item) {
    var tmpLine = line + item + ' ';
    var tmpWidth = ctx.measureText(tmpLine).width;

    if (tmpWidth > maxWidth) {
      ctx.fillText(line, x, y);
      line = item + ' ';
      y += 20;
    } else {
      line = tmpLine;
    }
  });

  ctx.fillText(line, x, y);
};

var getRandomBlueColor = function () {
  return 'rgba(0, 0,' + (Math.random() * 255).toFixed(0) + ',' + (Math.random() * (1 - 0.1) + 0.1).toFixed(1) + ')';
};

var isUserName = function (name) {
  return name === 'Вы';
};

window.renderStatistics = function (ctx, names, times) {
  var cloudWidth = 420;
  var cloudHeight = 270;

  var histoHeight = 150;
  var histoX = 140;
  var step = histoHeight / Math.max.apply(0, times);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  drawCloud(ctx, 110, 20, cloudWidth, cloudHeight);

  ctx.fillStyle = '#fff';
  drawCloud(ctx, 100, 10, cloudWidth, cloudHeight);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  printWrappedText(ctx, 'Ура, вы победили! Список результатов:', 140, 40, 200);

  times.forEach(function (time, i) {
    drawHisto(ctx, time, names[i], i, histoHeight, histoX, step);
  });
};
