import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {D3Service, D3, Selection} from 'd3-ng2-service';
import {IDecisonTree, ID3Tree} from '../../../shared/interfaces/IModel';
@Component({selector: 'app-decision-tree', templateUrl: './decision-tree.component.html', styleUrls: ['./decision-tree.component.scss']})
export class DecisionTreeComponent implements OnInit {

  private d3 : D3;
  root : any;
  svg : any;
  tree : any;
  duration : number = 750;
  width : number;
  height : number;
  dimensions : number[];
  rectW = 180;
  rectH = 80;
  margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
  };
  zm : any;
  nodes : any;

  parentNativeElement : any;
  @Input()treeData : IDecisonTree;
  constructor(d3Service : D3Service, element : ElementRef) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.dimensions = this.Initializelayout(this.parentW());
    this.AddSVG(this.dimensions);
    this.CreateDataStructure(this.treeData);
    this.Update(this.root);
    this.MarkNodes();
  }

  private MarkNodes() {
    const self = this;
    this
      .svg
      .selectAll('path.link')
      .each((x : any) => self.d3.select(x).classed('link-marked', x.data.marked));
  }

  private parentW() : number {
    // return this.parentNativeElement.offsetWidth;
    return 1000;
  }
  private Initializelayout(w : number) {
    this.width = w - this.margin.right - this.margin.left;
    this.height = 1000 - this.margin.top - this.margin.bottom;
    this.tree = this
      .d3
      .tree()
      .size([this.width, this.height])
      .nodeSize([160, 85]);
    return [this.height, this.width];
  }

  private AddSVG(dimensions : number[]) : any {
    this.svg = this
      .d3
      .select(this.parentNativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', 960)
      .call(this.zm = this.d3.zoom().scaleExtent([0.5, 3]).on('zoom', this.redraw.bind(this)))
      .append('g');
    this.AddShadowToNodes();

  }

  private redraw() {
    this
      .svg
      .attr('transform', this.d3.event.transform);
  }
  private AddShadowToNodes() {
    // filters goes in defs element
    const defs = this
      .svg
      .append('defs');
    const dropShadowFilter = defs
      .append('svg:filter')
      .attr('id', 'drop-shadow')
      .attr('filterUnits', 'userSpaceOnUse')
      .attr('width', '250%')
      .attr('height', '250%');
    dropShadowFilter
      .append('svg:feGaussianBlur')
      .attr('in', 'matrixOut')
      .attr('stdDeviation', 7)
      .attr('result', 'blur-out');
    dropShadowFilter
      .append('svg:feColorMatrix')
      .attr('in', 'offOut')
      .attr('type', 'matrix')
      .attr('vallues', `0.13   0     0   0   0
                                              0   0.14    0   0   0
                                              0     0    0.17 0   0
                                              0     0     0   1   0`)
      .attr('result', 'matrixOut');
    dropShadowFilter
      .append('svg:feOffset')
      .attr('in', 'color-out')
      .attr('dx', 3)
      .attr('dy', 3)
      .attr('result', 'the-shadow');
    dropShadowFilter
      .append('svg:feBlend')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'the-shadow')
      .attr('mode', 'normal');
  }

  private CreateDataStructure(data : IDecisonTree) {
    const dataStructure = this.IterateTree('START', data, 'root', null, false, false);
    this.root = this
      .d3
      .hierarchy(dataStructure, (d : any) =>{
        if(d === undefined){
          let abc = '';
        }
        return d.children;});
    this.root.x0 = 0;
    this.root.y0 = this.width / 2;
  }

  private IterateTree(name : string, item : IDecisonTree, direction : string,
     condition : string, marked : boolean, isLeaf : boolean) : ID3Tree {
    const treeNode: ID3Tree = {
      name: name,
      direction: direction,
      condition: condition,
      samples: item.sample,
      impurity: item.impurity,
      marked: marked,
      isLeaf: isLeaf
    };
    if (item.left || item.right) {
      treeNode.children = [];
      if (item.left) {
        treeNode
          .children
          .push(this.IterateTree(item.prediction, item.left, 'left', item.lCondition, item.left.marked, item.isLeaf));
      }
      if (item.right) {
        treeNode
          .children
          .push(this.IterateTree(item.prediction, item.right, 'right', item.rCondition, item.right.marked, item.isLeaf));
      } else if (item.isLeaf) {
        treeNode.children = [];
        treeNode
          .children
          .push({name: item.prediction, marked: item.marked, impurity: item.impurity, isLeaf: true});
      }
      return treeNode;
    }
  }

  private Update(source : any) {
    let i : number = 0;
    const self = this;
    const treeData = this.tree(this.root);
    this.nodes = treeData.descendants();
    const links = treeData
      .descendants()
      .slice(1);
    // Node depthsection. Normalize for fixed depth
    this
      .nodes
      .forEach(element => element.y = element.depth * 180);

    // Node section. Update nodes
    const node = this
      .svg
      .selectAll('g.node')
      .data(this.nodes, (d : any) => d.id || (d.id = ++i));

    // Enter nay new node in the paren'ts previous position
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', () => `translate(${source.x0},${source.y0})`)
      .on('click', this.Clicked.bind(this));
    nodeEnter
      .selectAll()
      .data((d : any) => (d._children || d.children)
        ? [d]
        : [])
      .enter()
      .append('rect')
      .attr('width', this.rectW)
      .attr('height', this.rectH)
      .attr('rx', 3)
      .attr('ry', 3)
      .style('filter', 'url(#drop-shadow)')
      .attr('class', 'node')
      .style('fill', (d : any) => d._children
        ? 'rgb(127,176,243'
        : '#fff')
      .on('mouseover', (x : any) => self.ShowTooltip(this, x))
      .on('mouseout', () => self.HideTooltip());

    // Add cirlce for nodes
    nodeEnter
      .selectAll()
      .data((x : any) => (x._children || x.children)
        ? [x]
        : [])
      .enter()
      .append('ellipse')
      .attr('rx', 35)
      .attr('ry', 20)
      .style('filter', 'url(#rop-shadow)')
      .attr('cx', this.rectW / 2)
      .attr('cy', this.rectH / 2)
      .attr('class', 'node');

    // Add labels for nodes
    nodeEnter
      .selectAll()
      .data((x : any) => (x._children || x.children)
        ? [x]
        : [])
      .enter()
      .append('text')
      .attr('class', 'dt-node-text')
      .attr('class', 'dt-node-text-rect')
      .attr('dy', '35em')
      .attr('x', this.rectW / 2)
      .attr('y', (this.rectH + 2) / 2)
      .attr('text-anchor', () => 'middle')
      .text((x : any) => `${x.data.condition || x.data.name}`)
      .on('mouseover', (x : any) => self.ShowTooltip(this, x))
      .on('mouseout', () => self.HideTooltip());

    // Add labels for nodes
    nodeEnter
      .selectAll()
      .data((x : any) => (x._children || x.children)
        ? [x]
        : [])
      .enter()
      .append('text')
      .attr('class', 'dt-node-text')
      .attr('class', 'dt-node-text-circle')
      .attr('dy', '35em')
      .attr('x', this.rectW / 2)
      .attr('y', (this.rectH + 2) / 2)
      .attr('text-anchor', () => 'middle')
      .text((x : any) => `${x.data.condition || x.data.name}`);

    // Update
    const nodeUpdate = nodeEnter.merge(node);
    // To transition the position of node
    nodeUpdate
      .transition()
      .duration(this.duration)
      .attr('transform', (d : any) => `translate(${d.x},${d.y})`);

    nodeUpdate
      .select('rect')
      .attr('width', this.rectW)
      .attr('height', this.rectH)
      .attr('stroke', '#444852')
      .attr('stroke-width', 1)
      .attr('class', 'node')
      .style('fill', (x : any) => x._children
        ? 'rgb(127,176,243'
        : '#fff');

    // Update the node atttributes and style
    nodeUpdate
      .select('ellipse.node')
      .attr('rx', 35)
      .attr('ry', 20)
      .attr('cursor', 'pointer');

    // Remove any existing nodes
    const nodeExit = node
      .exit()
      .transition()
      .duration(this.duration)
      .attr('transform', () => `translate(${source.x},${source.y})`)
      .remove();

    nodeExit
      .select('rect')
      .attr('width', this.rectW)
      .attr('height', this.rectH)
      .attr('stroke', '#444852')
      .attr('stroke-width', 1);

    // On exit reduce the node circle ize to 0
    nodeExit
      .select('ellipse')
      .attr('r', 1e-6);

    // on exit reduce the opacity of text labels
    nodeExit
      .select('text')
      .style('fill-opacity', 1e-6);

    // LINKS Update links
    const link = this
      .svg
      .selectAll('path.link')
      .data(links, (x : any) => x.id);

    // Enter any new link at parents previous position
    const linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function () {
        const o = {
          y: source.y0,
          x: source.x0
        };
        return this.Diagonal(o, o);
      }.bind(this));

    // Update
    const linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate
      .transition()
      .duration(this.duration)
      .attr('d', function () {
        const o = {
          x: source.x,
          y: source.y
        };
        return this.Diagonal(o, o);
      }.bind(this));

    // Store the old position for transition
    link
      .exit()
      .transition()
      .duration(this.duration)
      .attr('d', function () {
        const o = {
          x: source.x,
          y: source.y
        };
        return this.Diagonal(o, o);
      }.bind(this))
      .remove();

    // Store the old position for transition
    this
      .nodes
      .forEach(element => {
        element.x0 = element.x;
        element.y0 = element.y;
      });

    this
      .d3
      .selectAll('dt-node-text-rect')
      .each((x : any) => self.DisplayNode(this, self, self.rectW, 2, x));

  }

  private Diagonal(s : any, d : any) {
    const src : any = {
      x: s.x + this.rectW / 2,
      y: s.y + this.rectH / 2
    };
    const dest : any = {
      x: d.x + this.rectW / 2,
      y: d.y + this.rectH / 2
    };
    return `M ${src.x} ${src.y}
            L ${dest.x} ${dest.y}`;
  }

  DisplayNode(node : any, self : any, width : number, linesMax : number, data : any) {
    if (data.data.direction === 'root') {
      return;
    }
    let nextLine = self.TextEllipsis(node, self, self.rectW, linesMax);
    const lineHeight = 1.1;
    const textEl = self
      .d3
      .select(node.parentNode);
    textEl
      .append('text')
      .attr('class', 'dt-node-text-others')
      .text('')
      .attr('text-anchor', () => 'middle')
      .attr('x', this.rectW / 2)
      .on('mouseover', (x : any) => self.ShowTooltip(this, x))
      .on('mouseout', () => self.HideTooltip());

    textEl
      .append('text')
      .attr('class', 'dt-node-text-others')
      .text(`samples: ${data.data.sample}`)
      .attr('text-anchor', () => 'middle')
      .attr('x', this.rectW / 2)
      .on('mouseover', (x : any) => self.ShowTooltip(this, x))
      .on('mouseout', () => self.HideTooltip());

    textEl
      .append
      .attr('class', 'dt-node-text-others')
      .text(`Impurity: ${data.data.impurity}`)
      .attr('text-anchor', () => 'middle')
      .attr('x', this.rectW / 2)
      .on('mouseover', (x : any) => self.ShowTooltip(this, x))
      .on('mouseout', () => self.HideTooltip());
    textEl
      .selectAll('.dt-node-text-others')
      .each((x : any) => self.TextEllipsis(this, self, self.rectW, 1, nextLine++));
  }

  private TextEllipsis(node : any, self : any, width : number, linesMax : number, insertAt : number) {
    const textEl = self
      .d3
      .select(node);
    const [s,
      x,
      y,
      lineHeight] = [
      textEl.text(),
      textEl.attr('x'),
      textEl.attr('y'),
      1.1
    ];
    insertAt = insertAt || 0;
    let [lineNumber,
      tspanWidth,
      line] = [0, 0, ''];
    const maxLines = linesMax || 3;
    let tspan = textEl
      .text(null)
      .append('tspan')
      .attr('x', x)
      .attr('y', y);
    for (let i = 0; i < s.length && lineNumber < maxLines; i++) {
      const c = s.charAt(i);
      line += c;
      tspan.text(line);
      // tspanWidth = tspan  === null? 0 : tspan.node().getComputedTextLength();
      tspanWidth = tspan === null
        ? 0
        : + (i + 1) * 7.2;
      if (tspanWidth > (width - 1)) {
        tspan.text(line.slice(0, -1));
        if (++lineNumber >= maxLines) {
          line = (line.length > 3
            ? line.substring(0, line.length - 3)
            : line) + '...';
          tspan.text(line);
          break;
        }

        line = c;
        tspan = textEl
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .text(line);
      } else if (i === s.length - 1) {
        lineNumber++;
      }
    }
    textEl
      .selectAll('tspan')
      .each((d : any, i : any) => self.d3.select(this).attr('y', 14).attr('dy', ((i + insertAt) * lineHeight) + 'em'));
    return lineNumber;
  }

  private Clicked(d : any) {
    this.HideTooltip();
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.Update(d);
    this.AnimatePaths();
  }

  private ShowTooltip(node : any, d : any) {
    this
      .d3
      .select(node.parentNode)
      .append('polygon')
      .attr('class', 'dt-tooltip-arrow')
      .attr('points', '0,-16,8,0,20,-16');

    this
      .d3
      .select(node.parentNode)
      .append('rect')
      .attr('class', 'dt-tooltip')
      .style('filter', 'url(#drop-shadow)')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('x', '-20px')
      .attr('opacity', 1)
      .attr('y', -(this.rectH * 2) + 12 + 'px')
      .attr('height', this.rectH * 2)
      .attr('width', this.rectW * 2)
      .text('' + (d.data.condition || d.data.name));

    this
      .d3
      .select(node.parentNode)
      .select('dt-tooltip-text')
      .call(this.TooltipWrap.bind(this), node, (this.rectW * 2) - 4);

  }

  private TooltipWrap(text : any, node : any, width : number) {
    const textEl = text;
    const [s,
      x,
      y,
      lineHeight] = [
      textEl.text(),
      textEl.attr('x'),
      textEl.attr('y'),
      1.1
    ];
    let [tspan,
      line,
      tspanWidth,
      lineNumber] = [
      textEl
        .text(null)
        .append('tspan')
        .attr('x', x)
        .attr('y', y),
      '',
      '',
      0
    ];
    for (let i = 0; i < s.length; i++) {
      let c = s.charAt(i);
      line += c;
      tspan.text(line);
      tspanWidth = tspan == null
        ? 0
        : tspan
          .node()
          .getComputedTextLength();
      if (tspanWidth.length > (width - 1)) {
        tspan.text(line.slice(0, -1));
        line = c;

        tspan = textEl
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .text(line);
        ++lineNumber;
      }
    }
    this
      .d3
      .select(node.parentNode)
      .select('dt-tooltip')
      .attr('height', ((lineNumber + 1) * lineHeight + 1.1) + 'em')
      .attr('y', (-((lineNumber + 2) * lineHeight + 1.1)) + 'em');

    const that = this;
    // textEl   .selectAll('tspan')   .each((d, i) => that.d3.select(this).attr('y',
    // (-(lineNumber - i) * lineHeight + (2 * 1.1))) + 'em');
  }

  private HideTooltip() {
    this
      .d3
      .selectAll('.dt-tooltip-arrow')
      .style('opacity', 0)
      .remove();
    this
      .d3
      .selectAll('.dt-tooltip')
      .style('opacity', 0)
      .remove();
    this
      .d3
      .selectAll('.dt-tooltip-text')
      .style('opacity', 0)
      .remove();
  }

  private AnimatePaths() {
    const self = this;
    this
      .svg
      .selectAll('path.link')
      .each((x : any) => self.d3.select(x).classed('link-animated', x.data.animate));
  }

  private ResetSearch() {
    this.ResetTree();
    this.AnimatePaths();
  }

  private ResetTree() {
    // Expand all nodes
    if (this.root._children) {
      this.root.children = this.root._children;
      this.root._children = null;
    }
    this.ExpandChildren(this.root);
    this.Update(this.root);
    // Remove current animation
    this
      .svg
      .selectAll('path.link')
      .each((x : any) => x.data.animate = false);

  }

  private ExpandChildren(item : any) {
    if (item.children) {
      item
        .children
        .forEach(element => {
          if (element._children) {
            element.children = element._children;
            element._children = null;
          }
          this.ExpandChildren(element);
        });
    }
  }

  private SearchTree(searchText : string) {
    const item = this.root;
    // Reset tree
    this.ResetTree();
    // Add new animation condition
    this
      .svg
      .selectAll('ellipse.node')
      .each((x : any) => {
        if (searchText.toLowerCase() === x.data.nam.toLowerCase() || x.data.name.indexOf(searchText) >= 0) {
          while (x) {
            x.data.animate = true;
            x = x.parent;
          }
        }
      });
  }
}
