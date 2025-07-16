import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { MonthlyEntry } from '../types';

interface LineChartProps {
  data: MonthlyEntry[];
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, width = 600, height = 300 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%Y-%m-%d');
    const chartData = data.map(d => ({
      date: parseDate(d.date)!,
      total: d.results.total,
      electricity: d.results.electricity,
      transportation: d.results.transportation,
      diet: d.results.diet,
    }));

    const xScale = d3.scaleTime()
      .domain(d3.extent(chartData, d => d.date) as [Date, Date])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.total) || 0])
      .range([chartHeight, 0]);

    const line = d3.line<any>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.total))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %Y')))
      .style('font-size', '12px');

    g.append('g')
      .call(d3.axisLeft(yScale))
      .style('font-size', '12px');

    // Add axis labels
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (chartHeight / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('CO₂ Emissions (kg/year)');

    // Add the line
    const path = g.append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', '#10B981')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Animate the line
    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Add dots
    g.selectAll('.dot')
      .data(chartData)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.total))
      .attr('r', 0)
      .style('fill', '#10B981')
      .transition()
      .delay(2000)
      .duration(500)
      .attr('r', 4);

    // Add tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none');

    g.selectAll('.dot')
      .on('mouseover', function(event, d: any) {
        tooltip.transition().duration(200).style('opacity', .9);
        tooltip.html(`
          <strong>${d3.timeFormat('%B %Y')(d.date)}</strong><br/>
          Total: ${d.total.toLocaleString()} kg<br/>
          Electricity: ${d.electricity.toLocaleString()} kg<br/>
          Transport: ${d.transportation.toLocaleString()} kg<br/>
          Diet: ${d.diet.toLocaleString()} kg
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        tooltip.transition().duration(500).style('opacity', 0);
      });

    return () => {
      tooltip.remove();
    };

  }, [data, width, height]);

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} width={width} height={height} className="drop-shadow-lg" />
    </div>
  );
};

export default LineChart;