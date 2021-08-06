import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import WebView from "react-native-webview";

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            articleDetails: {}
        };
    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle = () => {
        const url = "http://localhost:5000/getData";
        axios
            .get(url)
            .then(response => {
                this.setState({ articleDetails: response.data.data });
            })
            .catch(error => {
                console.log(error.message);
            });
    };


    likedArticle = () => {
        const url = "http://localhost:5000/getLikedData";
        axios
            .post(url)
            .then(response => {
                this.getArticle();
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    unlikedArticle = () => {
        const url = "http://localhost:5000/getUnlikedData";
        axios
            .post(url)
            .then(response => {
                this.getArticle();
            })
            .catch(error => {
                console.log(error.message);
            });
    };


    render() {
        const { articleDetails } = this.state;
        if (articleDetails.url) {
            const { url } = articleDetails;

            return (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            centerComponent={{
                                text: "Recommended",
                                style: styles.headerTitle
                            }}
                            rightComponent={{ icon: "search", color: "black" }}
                            backgroundColor={"white"}
                            containerStyle={{ flex: 1 }}
                        />
                    </View>
                    <View style={{flex: 0.7}}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this.likedArticle}>
                                <Icon
                                    reverse
                                    name={"check"}
                                    type={"entypo"}
                                    size={RFValue(30)}
                                    color={"green"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.unlikedArticle}>
                                <Icon
                                    reverse
                                    name={"cross"}
                                    type={"entypo"}
                                    size={RFValue(30)}
                                    color={"red"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
        return null;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flex: 0.1
    },
    headerTitle: {
        color: "black",
        fontSize: RFValue(18),
        fontWeight: "bold"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});