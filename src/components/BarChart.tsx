import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { EmissionResults } from '../types';

interface BarChartProps {
  data: EmissionResults;
  width?: number;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, width = 500, height = 300 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chartData = [
      { category: 'Electricity', value: data.electricity, color: '#10B981' },
      { category: 'Transportation', value: data.transportation, color: '#3B82F6' },
      { category: 'Diet', value: data.diet, color: '#F59E0B' },
      { category: 'Goods', value: data.goods, color: '#8B5CF6' },
      { category: 'Digital', value: data.digital, color: '#EF4444' },
      { category: 'Travel', value: data.travel, color: '#F97316' },
    ].filter(d => d.value > 0);

    const xScale = d3.scaleBand()
      .domain(chartData.map(d => d.category))
      .range([0, chartWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.value) || 0])
      .range([chartHeight, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale))
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

    // Add bars
    const bars = g.selectAll('.bar')
      .data(chartData)
      .enter()
      .append('g')
      .attr('class', 'bar');

    bars.append('rect')
      .attr('x', d => xScale(d.category) || 0)
      .attr('width', xScale.bandwidth())
      .attr('y', chartHeight)
      .attr('height', 0)
      .style('fill', d => d.color)
      .style('opacity', 0.8)
      .transition()
      .duration(1000)
      .attr('y', d => yScale(d.value))
      .attr('height', d => chartHeight - yScale(d.value));

    // Add value labels on bars
    bars.append('text')
      .attr('x', d => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
      .attr('y', chartHeight)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#374151')
      .style('opacity', 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1)
      .attr('y', d => yScale(d.value) - 5)
      .text(d => `${d.value.toLocaleString()} kg`);

  }, [data, width, height]);

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} width={width} height={height} className="drop-shadow-lg" />
    </div>
  );
};

export default BarChart;