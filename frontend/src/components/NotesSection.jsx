import React, { useState } from 'react';

const NotesSection = () => {
  const [activeCourse, setActiveCourse] = useState('All');
  const [expandedNote, setExpandedNote] = useState(null);

  // Sample notes data for +2 Nepal courses
  const notesData = [
    {
      id: 1,
      date: '2023-06-15',
      course: 'Physics',
      topic: 'Newton\'s Laws of Motion',
      content: '1. First Law (Inertia): An object remains at rest or in uniform motion unless acted upon by external force.\n2. Second Law: F=ma (Force equals mass times acceleration)\n3. Third Law: For every action, there is an equal and opposite reaction.',
      tags: ['Laws', 'Dynamics'],
      color: 'bg-blue-100'
    },
    {
      id: 2,
      date: '2023-06-14',
      course: 'Chemistry',
      topic: 'Chemical Bonding',
      content: 'Types of bonds:\n- Ionic: Transfer of electrons (NaCl)\n- Covalent: Sharing of electrons (H2O)\n- Metallic: Sea of electrons\n\nVSEPR Theory predicts molecular shapes based on electron pair repulsion.',
      tags: ['Bonding', 'VSEPR'],
      color: 'bg-green-100'
    },
    {
      id: 3,
      date: '2023-06-13',
      course: 'Biology',
      topic: 'Cell Division',
      content: 'Mitosis:\n1. Prophase\n2. Metaphase\n3. Anaphase\n4. Telophase\n\nMeiosis produces gametes with half the chromosome number (haploid).',
      tags: ['Mitosis', 'Meiosis'],
      color: 'bg-purple-100'
    },
    {
      id: 4,
      date: '2023-06-12',
      course: 'Mathematics',
      topic: 'Trigonometry',
      content: 'Important formulas:\nsin²θ + cos²θ = 1\n1 + tan²θ = sec²θ\n1 + cot²θ = cosec²θ\n\nLaw of Sines: a/sinA = b/sinB = c/sinC',
      tags: ['Formulas', 'Identities'],
      color: 'bg-yellow-100'
    },
    {
      id: 5,
      date: '2023-06-11',
      course: 'English',
      topic: 'Essay Writing Tips',
      content: '1. Introduction with thesis statement\n2. Body paragraphs with topic sentences\n3. Use transition words\n4. Proper conclusion\n5. Maintain formal tone\n6. Proofread for errors',
      tags: ['Writing', 'Composition'],
      color: 'bg-red-100'
    }
  ];

  // Get unique courses for filter
  const courses = ['All', ...new Set(notesData.map(note => note.course))];

  // Filter notes by selected course
  const filteredNotes = activeCourse === 'All' 
    ? notesData 
    : notesData.filter(note => note.course === activeCourse);

  const toggleNote = (id) => {
    setExpandedNote(expandedNote === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar - Course filter */}
        <div className="w-full md:w-64">
          <div className="bg-white rounded-xl shadow-md p-4 sticky top-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📚</span> Courses
            </h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course}>
                  <button
                    onClick={() => setActiveCourse(course)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeCourse === course 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-indigo-50'}`}
                  >
                    {course}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main notes content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                  📝
                </span>
                Study Notes
              </h2>
              <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
              </span>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-xl font-medium text-gray-700">No notes found</h3>
                <p className="text-gray-500 mt-2">Create your first note for {activeCourse}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotes.map((note) => (
                  <div 
                    key={note.id} 
                    className={`${note.color} rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${expandedNote === note.id ? 'ring-2 ring-indigo-500' : ''}`}
                  >
                    <div 
                      className="p-4 cursor-pointer flex justify-between items-start"
                      onClick={() => toggleNote(note.id)}
                    >
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="font-bold text-gray-800 mr-3">{note.topic}</span>
                          <span className="text-xs bg-white px-2 py-1 rounded-full">
                            {note.course}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(note.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        {expandedNote === note.id ? '▲' : '▼'}
                      </button>
                    </div>
                    
                    {expandedNote === note.id && (
                      <div className="px-4 pb-4 pt-2 bg-white bg-opacity-70">
                        <div className="whitespace-pre-line text-gray-700 mb-3">
                          {note.content}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;