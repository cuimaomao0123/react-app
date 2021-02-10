import React, { memo, useState, useEffect, useRef } from 'react'
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { Table, Checkbox } from 'antd';
import { VirtualTableWrapper } from './style'
/*
  该组件为自己独立封装的虚拟滚动的表格组件，参考antdesign的Table虚拟部分，以及react-window库的使用
  更多功能正在添加中...
  带 * 号为必传props
*/
export default memo(function VirtualTable(props) {
  const {
    tableClassName,                 //最外层表格容器的className
    dataSource,                     //*表格数据
    columns,                        //*表格列   (表格高度根据scroll.y计算)
    scroll,                         //*表格的scroll，例scroll={{x：'100vw', y: 300}}
    pagination,                     //是否显示分页，默认不显示
    gridClassName,          
    gridCellClassName,    
    rowHeight,                      //行高
    bordered,                       //表格的标题是否需要border，不是表体，表体统一通过css默认给过border了
    rowKey,                         //
    onSelectChange                  //复选框回调事件(要出现复选框，column需要有'selection'项，并且传回调函数过来)
  } = props
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
    const totalHeight = rowHeight ? rawData.length * rowHeight : rawData.length * 39;
    return (
      <Grid
        ref={gridRef}
        className={['virtual-grid', gridClassName ? gridClassName :""].join(" ").trim()}
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => rowHeight ? rowHeight : 39}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => {                              //主体内容
          if(mergedColumns[columnIndex].dataIndex !== 'selection'){           //常规元素
            return (
              <div className={['virtual-table-cell', 
                                gridCellClassName ? gridCellClassName :"", 
                                columnIndex === mergedColumns.length - 1 ? 'virtual-table-cell-last' : "",
                                rawData[rowIndex]['isSelect'] ? 'selectClass':""
                              ].filter(item => item !== "").join(" ").trim()} 
                                style={style}>
                {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
              </div>
            );
          }else{                                                              //复选框
            return (
              <div className={['virtual-table-cell', 
                                gridCellClassName ? gridCellClassName :"", 
                                columnIndex === mergedColumns.length - 1 ? 'virtual-table-cell-last' : "",
                                rawData[rowIndex]['isSelect'] ? 'selectClass':""
                              ].filter(item => item !== "").join(" ").trim()} 
                                style={style}>
                <Checkbox checked={rawData[rowIndex]['isSelect']} onChange={e => onSelectChange(rawData[rowIndex])}/>
              </div>
            );
          }
        }}
      </Grid>
    );
  };

  return (
    <VirtualTableWrapper>
      <ResizeObserver
        onResize={({ width }) => {          //该宽度根据浏览器窗口大小改变而响应式改变
          setTableWidth(width);
        }}
      >
      <Table
        dataSource={dataSource}
        className={['virtual-table', tableClassName ? tableClassName :""].join(" ").trim()}
        columns={mergedColumns}
        pagination={pagination ? pagination : false}
        scroll={scroll}
        bordered={bordered ? bordered : true}
        components={{
          body: renderVirtualList,
        }}
        rowKey={rowKey ? rowKey: 'id'}
        />
      </ResizeObserver>
    </VirtualTableWrapper>
  )
})
