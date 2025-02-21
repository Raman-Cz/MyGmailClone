import React, { useEffect, useState } from 'react'
import Email from './Email'
import useGetAllEmails from '../hooks/useGetAllElements'
import { useSelector } from 'react-redux';
import { setSearchText } from '../redux/appSlice';

const Emails = () => {
  useGetAllEmails();
  const {emails,searchText} = useSelector(store => store.app);
  const [filterEmails,setFilterEmails] = useState(emails);

  useEffect(() => {
    const filterEmail = emails.filter((email) => {
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase())
    });
    setFilterEmails(filterEmail);
  } ,[searchText,emails]);

  return (
    <div>
      {
        filterEmails?.map((email) => <Email key={email._id} email={email} />) || null
      }

    </div>
  )
}

export default Emails