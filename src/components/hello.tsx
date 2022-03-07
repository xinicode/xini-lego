interface HelloProps {
  msg: string;
}
const Hello = (props: HelloProps) => {
  return (
    <h1>{props.msg}-children</h1>
  )
}   
 
Hello.props = ['msg'];

export default Hello;