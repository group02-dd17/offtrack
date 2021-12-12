; (function (undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.labels');

  /**
   * This label renderer will just display the label on the right of the node.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.labels.def = function (node, context, settings) {
    var x,
      y,
      w,
      h,
      e,
      fontStyle = settings('hoverFontStyle') || settings('fontStyle'),
      prefix = settings('prefix') || '',
      size = node[prefix + 'size'],
      fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;

    if (size < settings('labelThreshold'))
      return;

    if (!node.label || typeof node.label !== 'string')
      return;

    fontSize = (settings('labelSize') === 'fixed') ?
      settings('defaultLabelSize') :
      settings('labelSizeRatio') * size;

    context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
      fontSize + 'px ' + settings('font');

    // Label background:
    context.font = (fontStyle ? fontStyle + ' ' : '') +
      fontSize + 'px ' + (settings('hoverFont') || settings('font'));

    context.beginPath();
    context.fillStyle = settings('defaultlabelBGColor') === 'node' ?
      (node.color || settings('defaultNodeColor')) :
      settings('defaultLabelBGColor');

    if (node.label && typeof node.label === 'string') {
      x = Math.round(node[prefix + 'x'] + size + 3);
      y = Math.round(node[prefix + 'y'] - fontSize / 2 - 2);
      w = Math.round(context.measureText(node.label).width + 10);
      h = Math.round(fontSize + 4);
      e = Math.round(fontSize / 2);

      context.moveTo(x , y - e/3);
      context.lineTo(x + w + e/2, y - e/3);
      context.lineTo(x + w + e/2, y + h + e/3);
      context.lineTo(x, y + h + e/3);

      context.closePath();
      context.fill();

      context.lineWidth = 1.5;
      context.strokeStyle="#d8d8d8";
      context.stroke();
    }

    // Display the label:
    if (node.label && typeof node.label === 'string') {
      context.fillStyle = (settings('labelColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelColor');

      context.fillText(
        node.label,
        Math.round(node[prefix + 'x'] + size + 3 + e),
        Math.round(node[prefix + 'y'] + fontSize / 3)
      );
    }
  };
}).call(this);
