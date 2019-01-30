import Vue from 'vue'

const PubSub = new Vue()

PubSub.publish = PubSub.$emit
PubSub.subscribe = PubSub.$on

export default PubSub;
