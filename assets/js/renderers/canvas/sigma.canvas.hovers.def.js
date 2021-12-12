;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.hovers');

  /**
   * This hover renderer will basically display the label with a background.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.hovers.def = function(node, context, settings) {
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

    // Label background:
    context.font = (fontStyle ? fontStyle + ' ' : '') +
      fontSize + 'px ' + (settings('hoverFont') || settings('font'));

    context.beginPath();
    context.fillStyle = settings('labelHoverBGColor') === 'node' ?
      (node.color || settings('defaultNodeColor')) :
      settings('defaultHoverLabelBGColor');

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
      context.strokeStyle="black";
      context.stroke();
    }

    

    // Node border:
    if (settings('borderSize') > 0) {
      context.beginPath();
      context.fillStyle = settings('nodeBorderColor') === 'node' ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultNodeBorderColor');
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        size + settings('borderSize'),
        0,
        Math.PI * 2,
        true
      );
      context.closePath();
      context.fill();
    }

    // Node:
    var nodeRenderer = sigma.canvas.nodes[node.type] || sigma.canvas.nodes.def;
    nodeRenderer(node, context, settings);

    // Display the label:
    if (node.label && typeof node.label === 'string') {
      context.fillStyle = (settings('defaultLabelHoverColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelHoverColor');

      context.fillText(
        node.label,
        Math.round(node[prefix + 'x'] + size + 3 + e),
        Math.round(node[prefix + 'y'] + fontSize / 3)
      );
    }
  };
}).call(this);
