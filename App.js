import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Dimensions,
  ToastAndroid,
  RefreshControl,
  View
} from 'react-native';
import flatData from './src/data/courseData'
import FlatListItem from './src/widget/FlatListItem'

var ITEM_HEIGHT = 100;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});
const { width, height } = Dimensions.get('window');
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      refreshing: false,
      isLoadingMore: false,
      isNoMoreData: true,
      fHeight: 0,
    }
    this.isLoading = false;
    this.foot = '';
    this.page = 0;
    this._onRefresh = this._onRefresh.bind(this);
    this._onItemOnpress = this._onItemOnpress.bind(this);
  }

  componentDidMount() {
    this._refreshData();
  }

  // 下拉刷新
  _onRefresh = () => {
    this._refreshData();
  };

  _isEmpty(value) {
    return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
  }

  _onItemOnpress(itemData) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(itemData, ToastAndroid.SHORT);
    } else {
      alert(itemData);
    }
  }

  _refreshData() {
    this.setState({ refreshing: true })

    setTimeout(() => {

      let dataList = this.getData(false)

      this.setState({
        dataList: dataList,
        refreshing: false,
      })
    }, 2000)
  }

  _loadMore() {
    if (this.page >= 3) {
      this.setState({ isNoMoreData: true, isLoadingMore: false })
      return;
    }
    this.isLoading = true;
    this.setState({ isLoadingMore: true, isNoMoreData: false })

    setTimeout(() => {

      this.isLoading = false;
      let dataList = this.getData(true)

      this.setState({
        dataList: dataList,
        isLoadingMore: false,
      })
    }, 2000)
  }

  getData(isLoardMore) {
    if (isLoardMore) {
      this.page++;
      console.log('page',this.page)
    } else {
      this.page = 0;
    }

    let newData = flatData.slice(0,10);

    return isLoardMore ? [...this.state.dataList, ...newData] : newData;
  }

  _renderItem = (item) => {
    return (
      <FlatListItem
        data={item.item}
        index={item.index}
        onPress={this._onItemOnpress}
      />
    );
  }

  _renderHeader = () => {
    return this._isEmpty(this.state.dataList) ? null : <Text style={[styles.headerAndfooter, { backgroundColor: 'grey' }]}>This is header.</Text>;
  }

  _renderFooter = () => {
    if (this.state.isNoMoreData) {
      this.foot = '没有更多数据';

    } else if (this.state.isLoadingMore) {
      this.foot = '加载更多...';
    } else {
      this.foot = '';
    }
    return this._isEmpty(this.state.dataList) || this.foot === '' ? null : <Text style={[styles.headerAndfooter, { backgroundColor: 'grey' }]}>{this.foot}</Text>;
  }

  _renderSeparator = () => {
    return <View style={{ height: 0.5, backgroundColor: 'grey' }} />;
  }

  _renderEmpty = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>暂无数据</Text>
      </View>
    );
  }

  _onEndReached = () => {
    if (this.isLoading) {
      return;
    }
    this._loadMore();
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            onLayout={(e) => {
              let height = e.nativeEvent.layout.height;
              if (this.state.fHeight < height) {
                this.setState({ fHeight: height })
              }
            }}
            // 数据源
            data={this.state.dataList}
            // 渲染列表项
            renderItem={this._renderItem}
            // 渲染外加的header
            ListHeaderComponent={this._renderHeader}
            // 渲染外加的footer
            ListFooterComponent={this._renderFooter}
            // 列表项分隔线
            ItemSeparatorComponent={this._renderSeparator}
            // 空数据视图
            ListEmptyComponent={this._renderEmpty}
            refreshControl={
              <RefreshControl
                // 下拉刷新状态
                refreshing={this.state.refreshing}
                // 下拉刷新回调
                onRefresh={this._onRefresh}
                title="Loading..."
                colors={['#0087fc', '#00ff00', '#0000ff']} //loading颜色 Android有效
              />
            }
            initialNumToRender={7}
            // 决定当距离内容最底部还有多远时触发onEndReached回调
            onEndReachedThreshold={0.8}
            // 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
            onEndReached={this._onEndReached}
          >
          </FlatList>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerAndfooter: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 20,
  }
});