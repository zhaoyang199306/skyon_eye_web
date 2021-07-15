<script>
export default {
  name: 'MenuItem',
  functional: true,
  data(){
    return{
    }
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // vnodes.push(<i icon-class={icon}/>)
      // vnodes.push(<svg-icon icon-class={icon}/>)
      // vnodes.push(<div style="{width: 30px;height: 30px;margin-left:14px;backgroundImage:url('+this.coverImgUrl+')}"/>)
      // if (icon === "subIcon"){
      //   console.log("==ss===");
      //   console.log(vnodes);
      //   vnodes.push(<div id={icon}/>);
      // } else {
      // }
      vnodes.push(<div class={icon} style="width: 50px;height: 35px;background-size: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: initial;"/>)
    }

    if (title) {

      vnodes.push(<span slot='title' style="text-align: center;">{(title)}</span>)
    }
    return vnodes
  },

}
</script>

<style lang="scss" scoped>




</style>
