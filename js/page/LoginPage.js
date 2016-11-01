import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import _ from 'lodash';

import { server_host } from '../Config';

class P extends Component {

  state = {}

  async onLogin(){
    let { username, password } = this.state;
    console.log(username);
    console.log(password);
    try{
      let body = new FormData();
      _.forEach({ username, password }, (o,k)=>body.append(k, o));
      this.setState({login_loading:true});
      let resp = await fetch(`${server_host}auth/login`, { body, method:'POST'});
      let json = await resp.json();
      if(json.errno == 0){
        Actions.home();
      }else{
        Alert.alert(json.errmsg);
      }
    }catch(e){
      Alert.alert(e.toString());
    }finally{
      this.setState({login_loading:false});
    }

    // console.log(server_host);
    //
    // Alert.alert('登录2');
    // Actions.home();
  }
  render() {
    return (
      <View>
        <View style={{marginTop:50, height:100}}>
        </View>
        <View style={{borderTopWidth:1,borderBottomWidth:1}}>
          <View style={{marginLeft:10, height:48, flexDirection:'row'}}>
            <View style={{width:60, borderBottomWidth:1, alignItems:'center', justifyContent:'center'}}>
              <Text>账号</Text>
            </View>
            <View style={{flex:1, borderBottomWidth:1, justifyContent:'center'}}>
              <TextInput style={{flex:1}} placeholder='手机号码' autoFocus={true} returnKeyType='next' onSubmitEditing={()=>this.refs['pwd'].focus()} onChangeText={username=>this.setState({username})} />
            </View>
          </View>
          <View style={{marginLeft:10, height:48, flexDirection:'row'}}>
            <View style={{width:60, alignItems:'center', justifyContent:'center'}}>
              <Text>密码</Text>
            </View>
            <View style={{flex:1}}>
              <TextInput ref='pwd' style={{flex:1}} placeholder='请输入密码' secureTextEntry={true} returnKeyType='go' onSubmitEditing={()=>this.onLogin()} onChangeText={password=>this.setState({password})} />
            </View>
          </View>
        </View>

        <View style={{marginHorizontal:10, marginTop:20}}>
          <TouchableOpacity style={{height:48, backgroundColor:'#f00', alignItems:'center', justifyContent:'center', flexDirection:'row'}} onPress={()=>this.onLogin()}>
            <Text>登 录</Text>
            {this.state.login_loading ? (
              <ActivityIndicator style={{marginLeft:10}} animating={true} size='small' color='#fff' />
            ):null}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default P;
