import React from "react";
import { CiSearch } from "react-icons/ci";
import { VscClose } from "react-icons/vsc";
import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../Contexts/Contextprovider";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { isClicked, setisClicked } = useStateContext();
  const [getseachvalue, setgetseachvalue] = useState("");
  let ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setisClicked(!isClicked.search);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const Navigate = () => navigate(`/search/${getseachvalue}`);

  return (
    <form ref={ref} className="form  absolute top-[60px] right-0 w-full">
      <button onClick={Navigate}>
        <CiSearch className=" text-[#7f8187] text-xl " />
      </button>
      <input
        onChange={(event) => setgetseachvalue(event.target.value)}
        className="input text-[12px]"
        placeholder="جستجو در سایت"
        required=""
        type="text"></input>
      <button className="reset" type="reset">
        <VscClose />
      </button>
    </form>
  );
}
