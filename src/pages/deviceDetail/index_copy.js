import React, { useState, useEffect, useRef, memo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { Table } from 'antd';
import { columns, data } from './tableData'
import { DeviceDetailWrapper } from './style'
export default memo(function DeviceDetail() {
    const scroll = {y: 300, x:'100vw'}
    const [tableWidth, setTableWidth] = useState(0);
    const widthColumnCount = columns.filter(({ width }) => !width).length;
    const mergedColumns = columns.map((column) => {
      if (column.width) {
        return column;
      }
      return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
    });
    const gridRef = useRef();
    const [connectObject] = useState(() => {
      const obj = {};
      Object.defineProperty(obj, 'scrollLeft', {
        get: () => null,
        set: (scrollLeft) => {
          if (gridRef.current) {
            gridRef.current.scrollTo({
              scrollLeft,
            });
          }
        },
      });
      return obj;
    });
  
    const resetVirtualGrid = () => {
      gridRef.current && gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false,
      });
    };
  
    useEffect(() => resetVirtualGrid, [tableWidth]);
  
    const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
      ref.current = connectObject;   //{}
      const totalHeight = rawData.length * 34;
      return (
        <Grid
          ref={gridRef}
          className="virtual-grid"
          columnCount={mergedColumns.length}
          columnWidth={(index) => {
            const { width } = mergedColumns[index];
            return totalHeight > scroll.y && index === mergedColumns.length - 1
              ? width - scrollbarSize - 1
              : width;
          }}
          height={scroll.y}
          rowCount={rawData.length}
          rowHeight={() => 34}
          width={tableWidth}
          onScroll={({ scrollLeft }) => {
            onScroll({
              scrollLeft,
            });
          }}
        >
          {({ columnIndex, rowIndex, style }) => (
            <div className="virtual-table-cell" style={style}
            >
              {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
            </div>
          )}
        </Grid>
      );
    };

  return (
    <DeviceDetailWrapper>
      <ResizeObserver
        onResize={({ width }) => {          //该宽度根据浏览器窗口大小改变而响应式改变
          setTableWidth(width);
        }}
      >
      <Table
        dataSource={data}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        scroll={{y: 300, x:'100vw'}}
        components={{
          body: renderVirtualList,
        }}
        />
      </ResizeObserver>
    </DeviceDetailWrapper>
    
  )
})
