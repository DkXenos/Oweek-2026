// import prisma from '../../lib/prisma';

// export default async function AdminPage() {
//   const events = await prisma.event.findMany({
//     orderBy: { createdAt: 'desc' },
//   });

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <p className="mb-4">Daftar Event OWEEK:</p>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 text-black">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Title</th>
//               <th className="py-2 px-4 border-b">Location</th>
//               <th className="py-2 px-4 border-b">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.length === 0 ? (
//               <tr>
//                 <td colSpan={3} className="text-center py-4 border-b">Tidak ada data event.</td>
//               </tr>
//             ) : (
//               events.map((event) => (
//                 <tr key={event.id}>
//                   <td className="py-2 px-4 border-b text-center">{event.title}</td>
//                   <td className="py-2 px-4 border-b text-center">{event.location}</td>
//                   <td className="py-2 px-4 border-b text-center">
//                     {new Date(event.date).toLocaleDateString('id-ID')}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }