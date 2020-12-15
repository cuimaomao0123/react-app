import styled from 'styled-components';

export const ViewTopWrapper = styled.div`
.top_item{
  background-color: #ffffff;
  height: 70px;
  border: 1px solid #ebeef5;
  box-shadow: 0px 2px 10px rgba(0,0,0,.1);
}
.day{
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  .ant-radio-group{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  div{
    margin: 3px 0;
  }
}
.num_total{
  position: relative;
  padding: 0 20px;
  .icon-renqun-copy{
    position: absolute;
    top: 5px;
    font-size: 40px;
    color: #1296db;
  }
  .num_total_item1{
    position: absolute;
    top: 15px;
    left: 80px;
    font-size: 20px;
    color: #1296db;
  }
  .num_total_item2{
    position: absolute;
    top: 20px;
    left: 135px;
    color: #1296db;
    font-size: 14px;
  }
  .num_total_item3{
    position: absolute;
    top: 15px;
    left: 160px;
    min-width: 70px;
    max-width: 110px;
    span{
      color: #1296db;
      font-weight: bold;
    }
  }
}
.time_total{
  position: relative;
  padding: 0 20px;
  .icon-shijian{
    position: absolute;
    top: 5px;
    font-size: 40px;
    color: #1296db;
  }
  .time_total_item1{
    position: absolute;
    top: 15px;
    left: 80px;
    font-size: 20px;
    color: #1296db;
  }
  .time_total_item2{
    position: absolute;
    top: 20px;
    left: 125px;
    color: #1296db;
    font-size: 14px;
  }
  .time_total_item3{
    position: absolute;
    top: 15px;
    left: 160px;
    min-width: 70px;
    max-width: 110px;
    span{
      color: #1296db;
      font-weight: bold;
    }
  }
}
.abnormal_total{
  position: relative;
  padding: 0 20px;
  .icon-yichangfenxi{
    position: absolute;
    top: 5px;
    font-size: 35px;
    color: #1296db;
  }
  .abnormal_total_item1{
    position: absolute;
    top: 15px;
    left: 80px;
    font-size: 20px;
    color: #1296db;
  }
  .abnormal_total_item2{
    position: absolute;
    top: 20px;
    left: 115px;
    color: #1296db;
    font-size: 14px;
  }
  .abnormal_total_item3{
    position: absolute;
    top: 15px;
    left: 160px;
    min-width: 70px;
    max-width: 110px;
    span{
      color: #1296db;
      font-weight: bold;
    }
  }
}
.rate{
  position: relative;
  padding: 0 20px;
  .icon-shangsheng-copy{
    position: absolute;
    top: 5px;
    font-size: 35px;
    color: #1296db;
  }
  .rate_item1{
    position: absolute;
    top: 15px;
    left: 80px;
    font-size: 20px;
    color: #1296db;
  }
  .rate_item2{
    position: absolute;
    top: 20px;
    left: 105px;
    color: #1296db;
    font-size: 14px;
  }
  .rate_item3{
    position: absolute;
    top: 15px;
    left: 140px;
    min-width: 70px;
    max-width: 110px;
    span{
      color: #1296db;
      font-weight: bold;
    }
  }
}
`