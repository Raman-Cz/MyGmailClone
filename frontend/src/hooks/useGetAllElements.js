import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
    const dispatch = useDispatch();
    const { emails } = useSelector(store => store.app);

    useEffect(() => {
        let isMounted = true;
        const fetchEmails = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/email/getallemails", {
                    withCredentials: true
                });
                if (isMounted) {
                    dispatch(setEmails(res.data.emails));
                }
            } catch (err) {
                console.error("Error fetching emails:", err);
            }
        };
        fetchEmails();

        return () => {
            isMounted = false;
        };
    }, [dispatch]); 

    return emails; 
};

export default useGetAllEmails;