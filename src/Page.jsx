function Page(props) {
    let h3s = props.msgs.map((m) => <h3>{m}</h3>)
    console.log(h3s)

    return (<>
        <div style={{display: "flex"}}> 
            <input id="write" type="text"/>
            <button onClick={props.send}>Send</button>
        </div>
        {h3s}
    </>)
}

export default Page