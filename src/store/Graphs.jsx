//"@bokeh/bokehjs/build/js/bokeh.min.js"
//"@bokeh/bokehjs/build/js/bokeh-widgets.min.js"
//"@bokeh/bokehjs/build/js/bokeh-tables.min.js"
//"@bokeh/bokehjs/build/js/bokeh-api.min.js"
//"@bokeh/bokehjs/build/js/bokeh-gl.min.js"
//"@bokeh/bokehjs/build/js/bokeh-mathjax.min.js"

//"https://cdn.bokeh.org/bokeh/release/bokeh-3.2.1.min.js"
//"https://cdn.bokeh.org/bokeh/release/bokeh-widgets-3.2.1.min.js"
//"https://cdn.bokeh.org/bokeh/release/bokeh-tables-3.2.1.min.js"
//"https://cdn.bokeh.org/bokeh/release/bokeh-api-3.2.1.min.js"
//"https://cdn.bokeh.org/bokeh/release/bokeh-gl-3.2.1.min.js"
//"https://cdn.bokeh.org/bokeh/release/bokeh-mathjax-3.2.1.min.js"

Array.prototype.first = function (action) {
  return this.length == 0 ? null : action(this[0])
}

const graph_black = "#000000"
const graph_blue = "#0074D9"
const graph_red = "#FF4136"
const graph_green = "#2ECC40"
const graph_maroon = "#85144b"
const graph_white = "#FDFEFE"
const graph_grey = "#212F3C"
const graph_lightgrey = "#2E4053"

const graph_font = "Helvetica, sans-serif"

var graph_colors = {
  graph_black,
  graph_blue,
  graph_red,
  graph_green,
  graph_maroon,
  graph_white,
  graph_grey,
  graph_lightgrey,
}

function graph_color(color) {
  if (color in graph_colors) return graph_colors[color]
  return graph_black
}

var graph_defaults = {
  text_color: graph_white,
  background_color: graph_grey,
  inactive_color: graph_lightgrey,
  font: graph_font,
}

var graph_candle_sticks_colors = {
  segment_color: graph_white,
  increment_color: graph_blue,
  decrement_color: graph_red,
  vbar_border_color: graph_white,
}

function _graphInit(element, data, params) {
  if (!params) params = {}

  var _width = element.clientWidth - 10
  var _height = element.clientHeight

  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }

  // make the plot and add some tools
  var tools = "xpan,crosshair,wheel_zoom,box_zoom,zoom_out,reset,save"

  var figure_params = {
    title: new Bokeh.Title({
      text: data.title,
      text_color: graph_defaults.text_color,
      text_font: graph_defaults.font,
    }),
    tools: tools,
    height: _height,
    width: _width,
  }

  var plot = Bokeh.Plotting.figure(Object.assign(figure_params, params))

  plot.toolbar.logo = null

  plot.background_fill_color = graph_defaults.background_color
  plot.border_fill_color = graph_defaults.background_color

  plot.xgrid.grid_line_color = graph_defaults.inactive_color
  plot.ygrid.grid_line_color = graph_defaults.inactive_color

  plot.xaxis.axis_label_text_color = graph_defaults.text_color
  plot.xaxis.axis_label_text_font = graph_defaults.font

  plot.yaxis.axis_label_text_color = graph_defaults.text_color
  plot.yaxis.axis_label_text_font = graph_defaults.font

  plot.left.first((x) => {
    x.major_label_text_font = graph_defaults.font
    x.major_label_text_color = graph_defaults.text_color
  })

  plot.below.first((x) => {
    x.major_label_text_font = graph_defaults.font
    x.major_label_text_color = graph_defaults.text_color
  })

  plot.legend.location = "top_left"
  plot.legend.click_policy = "hide"
  plot.legend.background_fill_color = graph_defaults.background_color
  plot.legend.label_text_color = graph_defaults.text_color
  plot.legend.label_text_font = graph_defaults.font

  return plot
}

export async function plotLineGraph(element, data) {
  if (!element) return

  if (!(data && "x" in data && "y" in data)) return

  var plot = _graphInit(element, data, {
    x_axis_type: "datetime",
    x_range: _zoomOutRange(data.x, 1 / 100),
    y_range: _zoomOutRange(data.y, 1 / 100),
  })

  plot.line({ x: data.x, y: data.y, line_width: 1 })

  var view = await Bokeh.Plotting.show(plot, element)

  while (element.children.length > 1) element.removeChild(element.firstChild)

  return view
}

export async function plotMultiLineGraph(element, data) {
  if (!element) return

  if (!(data && "x" in data && "ys" in data)) return

  var plot = _graphInit(element, data, { x_axis_type: "datetime" })

  data.ys.forEach(function (itm, ndx) {
    plot.line({
      x: data.x,
      y: itm.y,
      line_width: 2,
      line_color: graph_color(itm.color),
      legend_label: itm.legend,
    })
  })

  var view = Bokeh.Plotting.show(plot, element)

  while (element.children.length > 1) element.removeChild(element.firstChild)

  return view
}

function plotCandleSticks(element, data) {
  if (!element) return

  var plot = _graphInit(element, data, { x_axis_type: "datetime" })

  var seg_data = {
    x0: data.date,
    y0: data.low,
    x1: data.date,
    y1: data.high,
    color: graph_candle_sticks_colors.segment_color,
    line_width: 1,
  }

  var df = data.min_date_range / 4

  var inc = function (x, i) {
    return data.open[i] <= data.close[i]
  }
  var dec = function (x, i) {
    return data.open[i] > data.close[i]
  }

  var qud_inc_data = {
    top: data.close.filter(inc),
    bottom: data.open.filter(inc),
    left: data.date.filter(inc).map(function (x) {
      return x - df
    }),
    right: data.date.filter(inc).map(function (x) {
      return x + df
    }),
    color: graph_candle_sticks_colors.increment_color,
  }

  var qud_dec_data = {
    top: data.close.filter(dec),
    bottom: data.open.filter(dec),
    left: data.date.filter(dec).map(function (x) {
      return x - df
    }),
    right: data.date.filter(dec).map(function (x) {
      return x + df
    }),
    color: graph_candle_sticks_colors.decrement_color,
  }

  plot.segment(seg_data)
  plot.quad(qud_inc_data)
  plot.quad(qud_dec_data)

  // Show the plot, appending it to the end of the current
  // section of the document we are in.
  Bokeh.Plotting.show(plot, element)
}

export async function plotCandleSticksGraphEx(element, data) {
  if (!element) return

  if (!("date" in data && data.date.length > 0)) return

  var xs = []
  //var xs_map = {};

  for (let i = 0; i < data.date.length; i++) {
    xs.push(i)
    //let d = new Date(data.date[i]);
    //xs_map[i] = d.toDateString();
  }

  //let d = new Date(data.date[data.date.length - 1]);
  //xs_map[data.date.length] = (new Date(d.setDate(d.getDate() + 1))).toDateString();

  var plot = _graphInit(element, data, {})

  class LocalFormatter extends Bokeh.TickFormatter {
    constructor(attrs) {
      super(attrs)
      function tickToDate(i, ticks, dates) {
        let ti = ticks[i]
        let di = dates[ti]

        if (di) {
          return new Date(di)
        }

        let t0 = ticks[0]
        let t1 = ticks[1]
        let td = t1 - t0
        let nd = ti % td

        let d0 = new Date(dates[t0])
        let d1 = new Date(dates[t1])
        let dd = d1.getTime() - d0.getTime()

        di = new Date(d0.getTime() + nd * dd)

        return di
      }

      this.doFormat = function (ticks, opts) {
        let formatted = []

        for (let i = 0, len = ticks.length; i < len; i++) {
          let d = tickToDate(i, ticks, data.date) // new Date(data.date[ticks[i]]);
          formatted.push(d.toDateString())
        }

        return formatted
      }
    }
  }

  plot.xaxis.formatter = new LocalFormatter()

  var seg_data = {
    x0: xs,
    y0: data.low,
    x1: xs,
    y1: data.high,
    color: graph_candle_sticks_colors.segment_color,
    line_width: 1,
  }

  var inc = function (x, i) {
    return data.open[i] <= data.close[i]
  }
  var dec = function (x, i) {
    return data.open[i] > data.close[i]
  }

  var vbar_inc_data = {
    x: xs.filter(inc),
    width: 0.5,
    top: data.close.filter(inc),
    bottom: data.open.filter(inc),
    fill_color: graph_candle_sticks_colors.increment_color,
    line_color: graph_candle_sticks_colors.vbar_border_color,
  }

  var vbar_dec_data = {
    x: xs.filter(dec),
    width: 0.5,
    top: data.close.filter(dec),
    bottom: data.open.filter(dec),
    fill_color: graph_candle_sticks_colors.decrement_color,
    line_color: graph_candle_sticks_colors.vbar_border_color,
  }

  plot.segment(seg_data)
  plot.vbar(vbar_inc_data)
  plot.vbar(vbar_dec_data)

  var view = await Bokeh.Plotting.show(plot, element)

  while (element.children.length > 1) element.removeChild(element.firstChild)
}

function plotScatterGraph(element, data) {
  if (!element) return

  if (!(data && "xs" in data && "ys" in data)) return

  // set up some data
  var xs = data.xs
  var ys = data.ys
  var names = data.names
  var x_label = data.x_label
  var y_label = data.y_label

  // create a data source
  var source = new Bokeh.ColumnDataSource({
    data: { x: xs, y: ys, names: names },
  })

  var plot = _graphInit(element, data, {
    x_axis_label: x_label,
    y_axis_label: y_label,
    x_range: _zoomOutRange(xs, 20 / 100),
    y_range: _zoomOutRange(ys, 20 / 100),
  })

  plot.scatter({ x: xs, y: ys, size: 8, fill_alpha: 0.6 })

  plot.text({ field: "x" }, { field: "y" }, names, {
    source,
    alpha: 1,
    x_offset: 0,
    y_offset: -5,
    text_font: graph_defaults.font,
    text_font_size: "10pt",
    text_color: graph_defaults.text_color,
    //, text_baseline: "middle"
    text_align: "center",
  })

  // show the plot
  var view = Bokeh.Plotting.show(plot, element)
}

function _zoomOutRange(xs, ratio) {
  var x_min = Math.min(...xs)
  var x_max = Math.max(...xs)

  var delta_x = (x_max - x_min) * ratio

  x_min -= delta_x
  x_max += delta_x

  if (x_min == x_max) return [x_min - x_min * ratio, x_min + x_min * ratio]

  return [x_min, x_max]
}
