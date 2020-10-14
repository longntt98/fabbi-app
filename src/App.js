import React, { useState } from 'react';



function App() {
  const [state, setState] = useState(1);
  const [meal, setMeal] = useState("Breakfast");
  const [number, setNumber] = useState(1);
  const [restaurant, setRestaurant] = useState("KFC");
  const [inputList, setInputList] = useState([{ dish: "Món ăn 1", quantity: 1 }]);

  const isChange = (event) => {
    if (event.target.name === "meal") { setMeal(event.target.value); }
    else if (event.target.name === "number") { setNumber(event.target.value); }
    else if (event.target.name === "restaurant") { setRestaurant(event.target.value); }
  }

  const func1 = () => {
    let state1 = state;
    if (meal && number) {
      if (number > 10) alert("Không thể đặt quá 10 người");

      else setState(state1 += 1);
    }
    else alert("Vui lòng điền đầy đủ thông tin")

  }

  const func3 = () => {
    let state1 = state;
    if (restaurant < 1) alert("Vui lòng điền đầy đủ thông tin");
    else setState(state1 += 1);

  }

  const func2 = () => {
    let i = 0;
    let result = 0;
    let state1 = state;
    for (; i < inputList.length; i++) {
      if (!inputList[i].dish || !inputList[i].quantity) {
        alert("Vui lòng điền đầy đủ thông tin");
        break;
      }
      result += parseInt(inputList[i].quantity);
    }
    if (result < number) alert("Tổng số món ăn phải lớn hơn " + number);
    else setState(state1 += 1);
  }

  const func4  = () => {
    console.log(meal);
    console.log(number);
    console.log(restaurant);
    console.log(inputList);
    alert("Đặt bàn thành công");
    setState(1);
  }

  const previousClick  = () => {
    let state1 = state;
    setState(state1 -= 1);
  }

  const stepClick  = (event) => {
    if(event.target.name == "step1") setState(1);
    if(event.target.name == "step2") setState(2);
    if(event.target.name == "step3") setState(3);
    if(event.target.name == "step4") setState(4);
    
  }

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if (inputList.length < 3) setInputList([...inputList, { dish: "Món ăn 1", quantity: 1 }]);
    else alert("Không thể đặt quá 3 món ăn");
  };


  const checkState = () => {
    if (state == 1) {
      return (
        <form className="text-center">
          <h3>Chọn bữa và số người</h3>
          <div className="form-group ">
            <label>Vui lòng chọn bữa ăn</label>
            <select onChange={(event) => isChange(event)} name="meal" className="form-control mb-2" defaultValue={meal} required>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            <label>Vui lòng nhập số người</label>
            <input onChange={(event) => isChange(event)} type="number" name="number" className="form-control mb-2" min="1" max="10" defaultValue={number} required />
            <div className="dropdown-divider"></div>
            <input type="button" onClick={() => func1()} className="btn btn-primary btn-lg btn-block " value="Next" />
          </div>
        </form>
      )
    }

    else if (state == 2) {
      return (
        <form className="text-center">
          <h3>Chọn nhà hàng</h3>
          <div className="form-group ">
            <label>Vui lòng chọn nhà hàng</label>
            <select onChange={(event) => isChange(event)} name="restaurant" className="form-control mb-2" defaultValue={restaurant} required>
              <option value="KFC">KFC</option>
              <option value="Lotteria">Lotteria</option>
              <option value="BuggerKing">BuggerKing</option>
            </select>
            <div className="dropdown-divider"></div>
            <div className="button-group row">
              <input type="button" onClick={() => previousClick()} className="btn btn-warning" value="Previous" style={{ width: "50%" }} />
              <input type="reset" onClick={() => func3()} className="btn btn-primary " value="Next" style={{ width: "50%" }} />
            </div>

          </div>
        </form>
      )
    }

    else if (state == 3) {
      return (
        <div className="text-center">
          <h3>Chọn món ăn</h3>
          {
            inputList.map((x, i) => {
              return (
                <div className="row mt-3 ">
                  <div className="col-7">
                    <select name="dish"  onChange={e => handleInputChange(e, i)} value={x.dish} style={{ width: "inherit", height:"29px" }}>
                      <option value="Món ăn 1">Món ăn 1</option>
                      <option value="Món ăn 2">Món ăn 2</option>
                      <option value="Món ăn 3">Món ăn 3</option>
                    </select>
                  </div>

                  <div className="col-4">
                    <input type="number" name="quantity" min="1" max="10" defaultValue={x.quantity} onChange={e => handleInputChange(e, i)} />
                  </div>
                  <div className="col-1 btn-group">
                    {inputList.length !== 1 && <button className="mr10" onClick={() => handleRemoveClick(i)} style={{ backgroundColor: "red" }}>X</button>}
                  </div>

                  {inputList.length - 1 === i && <button className=" fa fa-plus " type="button" style={{ fontSize: "45px", color: "#007bff", backgroundColor: "transparent", border: "none", margin: "auto" }} onClick={handleAddClick}></button>}
                </div>
              );
            })
          }
          <div className="button-group row">
            <input type="button" className="btn btn-warning"  onClick={() => previousClick()} value="Previous" style={{ width: "50%" }} />
            <input type="reset" onClick={() => func2()} className="btn btn-primary " value="Next" style={{ width: "50%" }} />
          </div>
        </div>
      )

    }

    else if (state == 4) {
      return (
        <form>
          <h3 className="text-center">Thông tin đặt bàn</h3>
          <div className="form-group ">
            <div className="row">
              <div className="col-6">
                <p>Bữa ăn</p>
                <p>Số người</p>
                <p>Nhà hàng</p>
                <p>Món ăn</p>
              </div>
              <div className="col-6">
                <p>{meal}</p>
                <p>{number} Khách</p>
                <p>{restaurant}</p>
                {inputList.map((x, i) => {
                  return (
                    <pre>{x.dish}       Số lượng: {x.quantity}</pre>
                  )
                })}
              </div>

            </div>
            <div className="dropdown-divider"></div>
            <div className="button-group row">
              <input type="button" className="btn btn-warning" onClick={() => previousClick()} value="Previous" style={{ width: "50%" }} />
              <input type="reset" onClick={() => func4()} className="btn btn-primary " value="Next" style={{ width: "50%" }} />
            </div>
          </div>
        </form>
      )
    }
  }

  return (
    <div className="container border" style={{width:"490px" , marginTop:"10px"}}>
      <div className="button-group row"> 
        <input className="btn btn-dark" onClick={(event) => stepClick(event)} name="step1" type="button" style={{width:"25%"}} value="Step 1"></input>
        <input className="btn btn-dark" onClick={(event) => stepClick(event)} name="step2" type="button" style={{width:"25%"}} value="Step 2"></input>
        <input className="btn btn-dark" onClick={(event) => stepClick(event)} name="step3" type="button" style={{width:"25%"}} value="Step 3"></input>
        <input className="btn btn-dark" onClick={(event) => stepClick(event)} name="step4" type="button" style={{width:"25%"}} value="Step 4"></input>
      </div>
      {checkState()}
    </div>
  )
}

export default App;