import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { EmissionResults } from '../types';

interface PieChartProps {
  data: EmissionResults;
  width?: number;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, width = 400, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const radius = Math.min(width, height) / 2 - 40;
    const centerX = width / 2;
    const centerY = height / 2;

    const pieData = [
      { label: 'Electricity', value: data.electricity, color: '#10B981' },
      { label: 'Transportation', value: data.transportation, color: '#3B82F6' },
      { label: 'Diet', value: data.diet, color: '#F59E0B' },
      { label: 'Goods', value: data.goods, color: '#8B5CF6' },
      { label: 'Digital', value: data.digital, color: '#EF4444' },
      { label: 'Travel', value: data.travel, color: '#F97316' },
    ].filter(d => d.value > 0);

    const pie = d3.pie<any>().value(d => d.value);
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);
    const labelArc = d3.arc<any>().innerRadius(radius * 0.6).outerRadius(radius * 0.6);

    const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);

    const slices = g.selectAll('.slice')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'slice');

    slices.append('path')
      .attr('d', arc)
      .style('fill', (d: any) => d.data.color)
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .style('opacity', 1)
      .attrTween('d', function(d: any) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t: number) {
          return arc(interpolate(t));
        };
      });

    slices.append('text')
      .attr('transform', (d: any) => `translate(${labelArc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', '#374151')
      .style('opacity', 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1)
      .text((d: any) => d.data.label);

    // Add percentage labels
    slices.append('text')
      .attr('transform', (d: any) => {
        const centroid = labelArc.centroid(d);
        return `translate(${centroid[0]}, ${centroid[1] + 16})`;
      })
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6B7280')
      .style('opacity', 0)
      .transition()
      .delay(1200)
      .duration(500)
      .style('opacity', 1)
      .text((d: any) => `${Math.round((d.data.value / data.total) * 100)}%`);

  }, [data, width, height]);

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} width={width} height={height} className="drop-shadow-lg" />
    </div>
  );
};

export default PieChart;