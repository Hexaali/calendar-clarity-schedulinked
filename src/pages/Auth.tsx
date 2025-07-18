// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import Header from "@/components/shared/Header";
// import { API_BASE_URL } from "@/components/shared/Constants";
// import { Toaster, toast } from "react-hot-toast";

// export default function Auth() {
//   const [mode, setMode] = useState("login");
//   const [userType, setUserType] = useState("artist");
//   const [formData, setFormData] = useState({
//     firstname: "",
//     email: "",
//     username: "",
//     password: "",
//     image: null,
//   });
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const imageRef = useRef(null);

//   useEffect(() => {
//     if (mode === "login") {
//       usernameRef.current?.focus();
//     } else {
//       nameRef.current?.focus();
//     }
//   }, [mode]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       const file = files[0];
//       if (file) {
//         setFormData((prev) => ({ ...prev, image: file }));
//         setPreviewUrl(URL.createObjectURL(file));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       firstname: "",
//       email: "",
//       username: "",
//       password: "",
//       image: null,
//     });
//     setPreviewUrl(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!formData.username) {
//       setError("Username is required");
//       usernameRef.current?.focus();
//       setLoading(false);
//       return;
//     }
//     if (!formData.password) {
//       setError("Password is required");
//       passwordRef.current?.focus();
//       setLoading(false);
//       return;
//     }

//     if (mode === "login") {
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             username: formData.username,
//             password: formData.password,
//           }),
//         });

//         const data = await res.json();
//         if (res.ok && data.token) {
//           const userData = {
//             token: data.token,
//             username: data.username,
//             full_name: data.full_name,
//             followers: data.followers || [],
//             isAuthenticated: true,
//           };
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("user", JSON.stringify(userData));

//           toast.success("Login successful!", {
//             style: { background: "green", color: "white" },
//           });

//           resetForm();
//           navigate("/dashboard");
//         } else {
//           toast.error(data.message || "Invalid username or password", {
//             style: { background: "red", color: "white" },
//           });
//         }
//       } catch (err) {
//         console.error("Login error:", err);
//         toast.error("Something went wrong. Please try again.", {
//           style: { background: "red", color: "white" },
//         });
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       try {
//         const { firstname, email, username, password, image } = formData;
//         let firstName = "",
//           lastName = "";
//         const nameParts = firstname.trim().split(/\s+/);
//         firstName = nameParts[0] || "";
//         lastName = nameParts.slice(1).join(" ") || "_";

//         const form = new FormData();
//         form.append("username", username);
//         form.append("email", email);
//         form.append("password", password);
//         form.append("first_name", firstName);
//         form.append("last_name", lastName);
//         form.append("type", userType.toUpperCase()); // 👈 dynamic type
//         if (image) form.append("profile_picture", image);

//         const res = await fetch(`${API_BASE_URL}/api/v1/register`, {
//           method: "POST",
//           body: form,
//         });

//         const responseText = await res.text();
//         let data;
//         try {
//           data = JSON.parse(responseText);
//         } catch {
//           toast.error("Server response not valid JSON.", {
//             style: { background: "red", color: "white" },
//           });
//           setLoading(false);
//           return;
//         }

//         if (!res.ok) {
//           toast.error(data.message || "Registration failed", {
//             style: { background: "red", color: "white" },
//           });
//           return;
//         }

//         toast.success("Registered successfully!", {
//           style: { background: "green", color: "white" },
//         });

//         resetForm();
//         setMode("login");
//       } catch (err) {
//         console.error("Registration error:", err);
//         toast.error("Something went wrong. Please try again.", {
//           style: { background: "red", color: "white" },
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const floatLabelClass = (value) =>
//     value
//       ? "top-0 text-xs text-black"
//       : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-black";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#fafff2]">
//       <Header variant="simple" />
//       <div className="flex items-center justify-center px-2 py-12">
//         <Card className="w-full max-w-md rounded-2xl shadow-lg border-0 bg-white animate-fade-in">
//           <CardContent className="py-8 px-8">
//             <div className="flex flex-col items-center mb-4 gap-y-2">
//               <img
//                 src="/lovable-uploads/2dac7733-cabb-4791-bcb3-b2a0608ce1c2.png"
//                 alt="Calendure Logo"
//                 className="h-12 w-12 mb-2"
//               />
//               <h2 className="text-2xl font-bold text-center">
//                 {mode === "login"
//                   ? "Welcome to Calendure"
//                   : "Welcome to Calendure"}
//               </h2>
//               <p className="text-gray-600 text-xs">
//                 The smarter way to schedule.
//               </p>
//             </div>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {mode === "register" && (
//                 <>
//                   <div className="flex justify-center gap-4 text-sm mb-1">
//                     <button
//                       type="button"
//                       onClick={() => setUserType("artist")}
//                       className={`px-4 py-1 rounded-full border font-semibold ${
//                         userType === "artist"
//                           ? "bg-[#C9FF57] text-black"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       Register as Artist
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setUserType("business")}
//                       className={`px-4 py-1 rounded-full border font-semibold ${
//                         userType === "business"
//                           ? "bg-[#C9FF57] text-black"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       Register as Business
//                     </button>
//                   </div>

//                   <div className="relative">
//                     <Input
//                       id="firstname"
//                       name="firstname"
//                       type="text"
//                       value={formData.firstname}
//                       onChange={handleChange}
//                       ref={nameRef}
//                       placeholder=" "
//                       className="peer bg-white pt-8 pb-2 block w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//                     />
//                     <label
//                       htmlFor="firstname"
//                       className={`absolute left-3 top-2 text-gray-500 text-sm transition-all ${floatLabelClass(
//                         formData.firstname
//                       )}`}
//                     >
//                       {userType === "artist" ? "Full Name" : "Business Name"}
//                     </label>
//                   </div>

//                   <div className="relative">
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       ref={emailRef}
//                       placeholder=" "
//                       className="peer bg-white pt-8 pb-2 block w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//                     />
//                     <label
//                       htmlFor="email"
//                       className={`absolute left-3 top-2 text-gray-500 text-sm transition-all ${floatLabelClass(
//                         formData.email
//                       )}`}
//                     >
//                       Email
//                     </label>
//                   </div>
//                 </>
//               )}

//               <div className="relative">
//                 <Input
//                   id="username"
//                   name="username"
//                   type="text"
//                   value={formData.username}
//                   onChange={handleChange}
//                   ref={usernameRef}
//                   placeholder=" "
//                   className="peer bg-white pt-8 pb-2 block w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 />
//                 <label
//                   htmlFor="username"
//                   className={`absolute left-3 top-2 text-gray-500 text-sm transition-all ${floatLabelClass(
//                     formData.username
//                   )}`}
//                 >
//                   Username
//                 </label>
//               </div>

//               <div className="relative">
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   ref={passwordRef}
//                   placeholder=" "
//                   className="peer bg-white pt-8 pb-2 block w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 />
//                 <label
//                   htmlFor="password"
//                   className={`absolute left-3 top-2 text-gray-500 text-sm transition-all ${floatLabelClass(
//                     formData.password
//                   )}`}
//                 >
//                   Password
//                 </label>
//               </div>

//               {mode === "register" && (
//                 <div className="relative pb-4">
//                   <label className="block text-xs mb-2">
//                     Profile Image (Optional)
//                   </label>
//                   <div
//                     className="flex gap-3 bg-white px-3 py-2 rounded-md shadow-sm border border-black cursor-pointer"
//                     onClick={() => imageRef.current?.click()}
//                   >
//                     <span className="text-xs">Choose an image</span>
//                     <input
//                       type="file"
//                       name="image"
//                       accept="image/*"
//                       onChange={handleChange}
//                       className="hidden"
//                       ref={imageRef}
//                     />
//                   </div>
//                   {previewUrl && (
//                     <img
//                       src={previewUrl}
//                       alt="Preview"
//                       className="mt-3 h-24 w-24 rounded-md object-cover border"
//                     />
//                   )}
//                 </div>
//               )}

//               {error && (
//                 <p className="text-red-600 text-sm text-center">{error}</p>
//               )}

//               <Button
//                 type="submit"
//                 size="lg"
//                 disabled={loading}
//                 className="w-full bg-[#C9FF57] text-black font-semibold py-3 rounded-lg hover:bg-[#b6ea4d] transition-all"
//               >
//                 {loading
//                   ? mode === "login"
//                     ? "Logging in..."
//                     : "Registering..."
//                   : mode === "login"
//                   ? "Login"
//                   : "Register"}
//               </Button>
//             </form>

//             <div className="mt-4 text-center text-sm text-muted-foreground">
//               {mode === "login" ? (
//                 <>
//                   Don’t have an account?{" "}
//                   <button
//                     className="text-[#99b728] underline font-semibold"
//                     onClick={() => {
//                       setMode("register");
//                       setUserType("artist");
//                     }}
//                   >
//                     Register
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{" "}
//                   <button
//                     className="text-[#99b728] underline font-semibold"
//                     onClick={() => setMode("login")}
//                   >
//                     Login
//                   </button>
//                 </>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/shared/Header";
import { API_BASE_URL } from "@/components/shared/Constants";
import { Toaster, toast } from "react-hot-toast";
import { BrandLogo} from "@/components/shared/Constants";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    username: "",
    password: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <-- Added

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (mode === "login") {
      usernameRef.current?.focus();
    } else {
      nameRef.current?.focus();
    }
  }, [mode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      email: "",
      username: "",
      password: "",
      image: null,
    });
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.username) {
      setError("Username is required");
      usernameRef.current?.focus();
      setLoading(false);
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      passwordRef.current?.focus();
      setLoading(false);
      return;
    }

    if (mode === "login") {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        const data = await res.json();
        if (res.ok && data.token) {
          const userData = {
            token: data.token,
            username: data.username,
            full_name: data.full_name,
            followers: data.followers || [],
            isAuthenticated: true,
          };
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(userData));

          toast.success("Login successful!", {
            style: { background: "green", color: "white" },
          });

          resetForm();

          // Redirect to Dashboard
          navigate("/dashboard"); // <== Redirect added here
        } else {
          toast.error(data.message || "Invalid username or password", {
            style: { background: "red", color: "white" },
          });
        }
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Something went wrong. Please try again.", {
          style: { background: "red", color: "white" },
        });
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const { firstname, email, username, password, image } = formData;
        let firstName = "",
          lastName = "";
        const nameParts = firstname.trim().split(/\s+/);
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(" ") || "_";

        const form = new FormData();
        form.append("username", username);
        form.append("email", email);
        form.append("password", password);
        form.append("first_name", firstName);
        form.append("last_name", lastName);
        form.append("type", "ARTIST");
        if (image) form.append("profile_picture", image);

        const res = await fetch(`${API_BASE_URL}/api/v1/register`, {
          method: "POST",
          body: form,
        });

        const responseText = await res.text();
        let data;
        try {
          data = JSON.parse(responseText);
        } catch {
          toast.error("Server response not valid JSON.", {
            style: { background: "red", color: "white" },
          });
          setLoading(false);
          return;
        }

        if (!res.ok) {
          toast.error(data.message || "Registration failed", {
            style: { background: "red", color: "white" },
          });
          return;
        }

        toast.success("Registered successfully!", {
          style: { background: "green", color: "white" },
        });

        resetForm();
        setMode("login");
      } catch (err) {
        console.error("Registration error:", err);
        toast.error("Something went wrong. Please try again.", {
          style: { background: "red", color: "white" },
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const floatLabelClass = (value) =>
    value
      ? "top-0 text-xs text-black"
      : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-black";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#fafff2]">
      <Header variant="simple" />
      <div className="flex items-center justify-center px-2 py-12">
        <Card className="w-full max-w-md rounded-2xl shadow-lg border-0 bg-white animate-fade-in">
          <CardContent className="py-8 px-8">
            <div className="flex flex-col items-center mb-4 gap-y-2">
                {BrandLogo}
              <h2 className="text-2xl font-bold text-brand-green text-center">
                {mode === "login"
                  ? "Welcome to Calendure"
                  : "Welcome to Calendure"}
              </h2>
              <p className="text-gray-600 text-xs">
                The smarter way to schedule.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {mode === "register" && (
                <>
                  <div className="relative">
                    <Input
                      id="firstname"
                      name="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={handleChange}
                      ref={nameRef}
                      placeholder=" "
                      className="peer bg-white pt-8 pb-2 block w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <label
                      htmlFor="firstname"
                      className={`absolute left-3 top-2 text-gray-500 text-sm transition-all ${floatLabelClass(
                        formData.firstname
                      )}`}
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      ref={emailRef}
                      placeholder=" "
                      className="peer bg-white pt-8 pb-2 block w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-3 top-2 text-gray-500 text-sm transition-all ${floatLabelClass(
                        formData.email
                      )}`}
                    >
                      Email
                    </label>
                  </div>
                </>
              )}

              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  ref={usernameRef}
                  placeholder=" "
                  className="peer bg-white pt-8 pb-2 block w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <label
                  htmlFor="username"
                  className={`absolute left-3 top-2 text-gray-500 text-sm transition-all ${floatLabelClass(
                    formData.username
                  )}`}
                >
                  Username
                </label>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  ref={passwordRef}
                  placeholder=" "
                  className="peer bg-white pt-8 pb-2 block w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 top-2 text-gray-500 text-sm transition-all ${floatLabelClass(
                    formData.password
                  )}`}
                >
                  Password
                </label>
              </div>

              {mode === "register" && (
                <div className="relative pb-4">
                  <label className="block text-xs mb-2">
                    Profile Image (Optional)
                  </label>
                  <div
                    className="flex gap-3 bg-white px-3 py-2 rounded-md shadow-sm border border-black cursor-pointer"
                    onClick={() => imageRef.current?.click()}
                  >
                    <span className="text-xs">Choose an image</span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                      ref={imageRef}
                    />
                  </div>
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-3 h-24 w-24 rounded-md object-cover border"
                    />
                  )}
                </div>
              )}

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-brand-orange text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all"
              >
                {loading
                  ? mode === "login"
                    ? "Logging in..."
                    : "Registering..."
                  : mode === "login"
                  ? "Login"
                  : "Register"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    className="text-brand-green underline font-semibold"
                    onClick={() => setMode("register")}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="text-brand-green underline font-semibold"
                    onClick={() => setMode("login")}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}