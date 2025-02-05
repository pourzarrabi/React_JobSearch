/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useJobContext } from "../context/JobContext";
import { useEffect } from "react";

const EditJobPage = () => {
  const { job: contextJob, setJob, updateJob, jobLoader } = useJobContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await jobLoader(id);
        if (jobData) {
          setJob((prev) => ({
            ...prev,
            title: jobData.title || "",
            description: jobData.description || "",
            salary: jobData.salary || "Under $50K",
            location: jobData.location || "",
            type: jobData.type || "Full-Time",
            company: {
              ...prev.company,
              name: jobData.company?.name || "",
              description: jobData.company?.description || "",
              contactEmail: jobData.company?.contactEmail || "",
              contactPhone: jobData.company?.contactPhone || "",
            },
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await updateJob(contextJob, id);
      toast.success("Job Updated Successfully");
      navigate(`/jobs/${id}`);
    } catch (error) {
      toast.error("Failed to update job");
    }
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Update Job
            </h2>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Job Type
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={contextJob.type}
                onChange={(e) =>
                  setJob((prev) => ({ ...prev, type: e.target.value }))
                }
              >
                <option value='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Remote'>Remote</option>
                <option value='Internship'>Internship</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Job Listing Name
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='e.g. Software Engineer'
                required
                value={contextJob.title}
                onChange={(e) =>
                  setJob((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any job duties, expectations, requirements, etc.'
                value={contextJob.description}
                onChange={(e) =>
                  setJob((prev) => ({ ...prev, description: e.target.value }))
                }
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='salary'
                className='block text-gray-700 font-bold mb-2'
              >
                Salary
              </label>
              <select
                id='salary'
                name='salary'
                className='border rounded w-full py-2 px-3'
                required
                value={contextJob.salary}
                onChange={(e) =>
                  setJob((prev) => ({ ...prev, salary: e.target.value }))
                }
              >
                <option value='Under $50K'>Under $50K</option>
                <option value='$50K - 60K'>$50K - $60K</option>
                <option value='$60K - 70K'>$60K - $70K</option>
                <option value='$70K - 80K'>$70K - $80K</option>
                <option value='$80K - 90K'>$80K - $90K</option>
                <option value='$90K - 100K'>$90K - $100K</option>
                <option value='$100K - 125K'>$100K - $125K</option>
                <option value='$125K - 150K'>$125K - $150K</option>
                <option value='$150K - 175K'>$150K - $175K</option>
                <option value='$175K - 200K'>$175K - $200K</option>
                <option value='Over $200K'>Over $200K</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                required
                value={contextJob.location}
                onChange={(e) =>
                  setJob((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>

            <h3 className='text-2xl mb-5'>Company Info</h3>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Company Name
              </label>
              <input
                type='text'
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3'
                placeholder='Company Name'
                value={contextJob.company.name}
                onChange={(e) =>
                  setJob((prev) => ({
                    ...prev,
                    company: { ...prev.company, name: e.target.value },
                  }))
                }
              />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
