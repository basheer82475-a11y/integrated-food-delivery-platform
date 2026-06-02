useEffect(() => {
  api
    .get("/restaurants")
    .then((res) => {
      console.log("API Response:", res.data);
      setRestaurants(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);