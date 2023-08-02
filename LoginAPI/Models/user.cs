using System.ComponentModel.DataAnnotations;

namespace LoginAPI.Models
{
	public class user
	{
		[Key]
		[MaxLength(100)]
		public string ?email { get; set; }

		[Required]
		[MaxLength(50)]
		public string ?password { get; set; }
	}
}